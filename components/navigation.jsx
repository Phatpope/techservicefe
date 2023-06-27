import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { fetchDataFromApi } from "@/utils/api";


const formatKey = (key) => {
  // Convert key from camelCase to a more readable format
  return key.replace(/([A-Z])/g, ' $1').toUpperCase();
};

const Navigation = ({ product }) => {
  const Menus = [
    { name: "Info" },
    { name: "Video" },
    { name: "Detail" },
  ];

  const [active, setActive] = useState(0);
  const [productDetail, setProductDetail] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await fetchDataFromApi(`/api/productdetails?populate=*&[filters][product][slug][$eq]=${product.slug}`);
        const data = response?.data[0]?.attributes;
        console.log("cmcmcmmcmccc",response?.data[0])
  
        const filteredProductDetail = { ...data };
  
        if (filteredProductDetail && filteredProductDetail.product) {
          delete filteredProductDetail.product;
        }
  
        setProductDetail(filteredProductDetail);
      } catch (error) {
        console.error("Error fetching product detail:", error);
      }
    };
  
    fetchProductDetail();
  }, [product.slug]);
  
  const infoContent = (
    <div>
      <div className="text-lg font-bold mb-5">Product Information:</div>
      <div className="markdown text-md mb-5">
        <ReactMarkdown>{product.info}</ReactMarkdown>
      </div>
    </div>
  );

  const videoContent = (
    <div>
      <h2>Product Video</h2>
      <iframe
        width="560"
        height="315"
        src={product.video}
        title="Product Video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );

  const detailContent = productDetail ? (
    <div>
      <h2>Product Detail</h2>
      <ul>
        {Object.entries(productDetail).map(([key, value]) => (
          <><li key={key}>
            <strong>{formatKey(key)}: </strong>
            {value}
          </li><tr>
              
          <hr className="border-t border-gray-300 my-4" />
          <p>------------------------------------------------------------------</p>
            </tr></>
        ))}
      </ul>
    </div>
  ) : null;
  
  


  return (
    <div className="bg-white h-18 rounded-full px-4">
      <ul className="flex relative justify-center items-center h-1/4 py-40">
        {Menus.map((menu, i) => (
          <li key={i} className="w-30">
            <a
              className="flex flex-col text-center p-5 cursor-pointer px-4"
              onClick={() => setActive(i)}
            >
              <span
                className={`${
                  active === i
                    ? "duration-700 opacity-100 font-bold"
                    : "opacity-40"
                }`}
              >
                {menu.name}
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {active === 0 && infoContent}
        {active === 1 && videoContent}
        {active === 2 && detailContent}
      </div>
    </div>
  );
};

export default Navigation;
