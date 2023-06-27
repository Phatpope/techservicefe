import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import ProductCard from "@/components/ProductCard";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import { fetchDataFromApi } from "@/utils/api";
const maxResult = 9;

// Create a new context for storing the filtered products
const FilteredProductsContext = React.createContext([]);

const AllProduct = ({ category, products }) => {
  const [selectedRamSizes, setSelectedRamSizes] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const { query, events } = useRouter();

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  const [filteredProducts, setFilteredProducts] = useState(products.data);

  const handleRamFilter = (ramSize) => {
    let updatedRamSizes;

    if (selectedRamSizes.includes(ramSize)) {
      // If the RAM size is already selected, remove it
      updatedRamSizes = selectedRamSizes.filter((size) => size !== ramSize);
    } else {
      // If the RAM size is not selected, add it
      updatedRamSizes = [...selectedRamSizes, ramSize];
    }

    setSelectedRamSizes(updatedRamSizes);

    let filteredProducts;

    if (updatedRamSizes.length === 0) {
      // If no RAM sizes are selected, display all products
      filteredProducts = products.data;
    } else {
      filteredProducts = products.data.filter((product) => {
        if (product.attributes?.size && product.attributes.size.data) {
          const productRamSizes = product.attributes.size.data.map(
            (ramSize) => ramSize.size
          );
          return productRamSizes.some((ramSize) =>
            updatedRamSizes.includes(ramSize)
          );
        }
        return false;
      });
    }

    // Update the filtered products in the context
    setFilteredProducts(filteredProducts);

    // Update the data value with filteredProducts
    mutate(
      `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
      { data: filteredProducts },
      false
    );
  };

  const handleCategory = async (selectCategory) => {
    setPageIndex(1);
    const name = encodeURIComponent(selectCategory);
    const url = `/api/products?populate=*&[filters][category][name][$eq]=${name}&pagination[page]=1&pagination[pageSize]=${maxResult}`;

    try {
      const response = await fetchDataFromApi(url);
      const filteredProducts = response.data;

      // Update the filtered products in the context
      setFilteredProducts(filteredProducts);

      // Update the data value with filteredProducts
      mutate(
        `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
        { data: filteredProducts },
        false
      );
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handlePriceFilter = (maxPrice) => {
    const filteredProducts = products.data.filter((product) => {
      if (product.attributes?.price && product.attributes.price) {
        const productPrice = product.attributes.price;
        return productPrice <= maxPrice;
      }
      return false;
    });

    // Update the filtered products in the context
    setFilteredProducts(filteredProducts);

    mutate(
      `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
      { data: filteredProducts },
      false
    );
  };

  // Use the filtered products from the context
  const { data, error, isValidating } = useSWR(
    `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    {
      initialData: filteredProducts, // Use the filtered products as initial data
    }
  );

  useEffect(() => {
    // Prevent page reloading when navigating back
    const handleBeforePopState = () => {
      // Restore the filtered products in the context
      setFilteredProducts(data?.data || []);

      // Prevent reloading by returning false
      return false;
    };

    // Add the beforePopState event listener
    events.on("beforePopState", handleBeforePopState);

    // Clean up the event listener on component unmount
    return () => {
      events.off("beforePopState", handleBeforePopState);
    };
  }, [events, data]);

  return (
    <Wrapper>
      <Sort />
      <FilteredProductsContext.Provider value={filteredProducts}>
        <div className="flex flex-wrap">
          <div className="w-1/4">
            <Filter
              categories={category}
              products={products}
              handleRamFilter={handleRamFilter}
              handleCategory={handleCategory}
              handlePriceFilter={handlePriceFilter}
            />
          </div>
          <div className="w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-20 md:px-20">
              {data?.data?.map((product) => (
                <ProductCard key={product?.id} data={product} />
              ))}
            </div>
            {data?.meta?.pagination?.total > maxResult && (
              <div className="flex gap-3 items-center justify-center my-16 md:my-0">
                <button
                  className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                  disabled={pageIndex === 1}
                  onClick={() => setPageIndex(pageIndex - 1)}
                >
                  Previous
                </button>
                <span className="font-bold">{`${pageIndex} of ${
                  products && products.meta.pagination.pageCount
                }`}</span>
                <button
                  className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
                  disabled={
                    pageIndex === (products && products.meta.pagination.pageCount)
                  }
                  onClick={() => setPageIndex(pageIndex + 1)}
                >
                  Next
                </button>
              </div>
            )}
            {isValidating && (
              <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
                <img src="/logo.svg" width={150} />
                <span className="text-2xl font-medium">Loading...</span>
              </div>
            )}
            <br />
          </div>
        </div>
      </FilteredProductsContext.Provider>
    </Wrapper>
  );
};

export async function getServerSideProps() {
  const category = await fetchDataFromApi(`/api/categories?populate=*`);
  const products = await fetchDataFromApi(
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return {
    props: {
      category,
      products,
    },
  };
}

export default AllProduct;
