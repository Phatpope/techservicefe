import React, { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Wrapper from "@/components/Wrapper";
import CartItem from "@/components/CartItem";
import { router } from "next/router";

import { useSelector } from "react-redux";

import { makePaymentRequest,makeOffLinePaymentRequest } from "@/utils/api";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

const Cart = () => {
  const [loading, setLoading] = useState(false);
  const [loadingOffline, setLoadingOffline] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const subTotal = useMemo(() => {
    return cartItems.reduce((total, val) => total + val.attributes.price, 0);
  }, [cartItems]);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleOffline();
  };
  const handleBuyOffline = (e) => {
    setShowForm(true)
  };

  
  const handlePayment = async () => {
    try {
      console.log(cartItems);
      console.log("xxxxxxxxxxxxxxxxx");

      setLoading(true);
      const stripe = await stripePromise;
      const res = await makePaymentRequest("/api/orders", {
        products: cartItems,
      });
      console.log(res);
      if (!res.stripeSession || !res.stripeSession.id) {
        throw new Error("Missing stripeSession or stripeSession.id");
      }

      await stripe.redirectToCheckout({
        sessionId: res.stripeSession.id,
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleOffline = async () => {
    try {
      const res = await makeOffLinePaymentRequest("/api/shippings", {
        name,
        phone,
        address,
        products: cartItems,
      });
      if (res.data.attributes.name === name) {
        router.push("/success"); // redirect to success page
      } else {
        router.push("/failed"); 
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  

  return (
    <div className="w-full md:py-20">
      <Wrapper>
        {cartItems.length > 0 && (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className="text-center max-w-[800px] mx-auto mt-8 md:mt-0">
              <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
                Shopping Cart
              </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className="flex flex-col lg:flex-row gap-12 py-10">
              {/* CART ITEMS START */}
              <div className="flex-[2]">
                <div className="text-lg font-bold">Cart Items</div>
                {cartItems.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </div>
              {/* CART ITEMS END */}

              {/* SUMMARY START */}
              <div className="flex-[1]">
                <div className="text-lg font-bold">Summary</div>

                <div className="p-5 my-5 bg-black/[0.05] rounded-xl">
                  <div className="flex justify-between">
                    <div className="uppercase text-md md:text-lg font-medium text-black">
                      Subtotal
                    </div>
                    <div className="text-md md:text-lg font-medium text-black">
                      &#8377;{subTotal}
                    </div>
                  </div>
                  <div className="text-sm md:text-md py-5 border-t mt-5">
                    The subtotal reflects the total price of your order,
                    including duties and taxes, before any applicable discounts.
                    It does not include delivery costs and international
                    transaction fees.
                  </div>
                </div>

                {/* BUTTON START */}
                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={handlePayment}
                >
                  Checkout
                  {loading && <img src="/spinner.svg" />}
                </button>

                <button
                  className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 flex items-center gap-2 justify-center"
                  onClick={handleBuyOffline}
                >
                  Buy Offline
                  {loadingOffline && <img src="/spinner.svg" />}
                </button>

                {/* BUTTON END */}
              </div>
              {/* SUMMARY END */}
            </div>
            {/* CART CONTENT END */}
          </>
        )}

        {/* This is empty screen */}

        {showForm && (
          <div className="mt-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone
                </label>
                <input
                  className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                  id="phone"
                  type="text"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  className="border border-gray-300 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:border-gray-500"
                  id="address"
                  rows="3"
                  placeholder="Enter your address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              >
                Submit
              </button>
            </form>
          </div>
        )}

        {cartItems.length < 1 && (
          <div className="flex-[2] flex flex-col items-center pb-[50px] md:-mt-14">
            <Image
              src="/empty-cart.jpg"
              width={300}
              height={300}
              className="w-[300px] md:w-[400px]"
            />
            <span className="text-xl font-bold">Your cart is empty</span>
            <span className="text-center mt-4">
              Looks like you have not added anything in your cart.
              <br />
              Go ahead and explore top categories.
            </span>
            <Link
              href="/"
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75 mt-8"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

export default Cart;
