import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState } from "react";
import HeroBanner from "@/components/HeroBanner";
import { fetchDataFromApi } from "@/utils/api";
import useSWR from "swr";
import ProductCard from "@/components/ProductCard";
import Blog from "./blog";


const maxResult = 9;

export default function Home({ products }) {
  const [pageIndex, setPageIndex] = useState(1);
  const { data, error, isValidating } = useSWR(
    `/api/products?populate=*&pagination[page]=${pageIndex}&pagination[pageSize]=${maxResult}`,
    fetchDataFromApi,
    {
      initialData: products,
    }
  );

  const filteredProducts = data?.data || [];

  const pageCount = data?.meta?.pagination?.pageCount;

  const handlePrevPage = () => {
    if (pageIndex > 1) {
      setPageIndex((prevPageIndex) => prevPageIndex - 1);
    }
  };

  const handleNextPage = () => {
    if (pageIndex < pageCount) {
      setPageIndex((prevPageIndex) => prevPageIndex + 1);
    }
  };

  return (
    <main>
      <HeroBanner />
      <Wrapper>
        {/* heading and paragraph start */}
        <div className="text-center max-w-[800px] mx-auto my-[50px] md:my-[80px]">
          <div className="text-[28px] md:text-[34px] mb-5 font-semibold leading-tight">
            Sản Phẩm Mới Nhất
          </div>
          <div className="text-md md:text-xl">
            A lightweight Nike ZoomX midsole is combined with increased stack
            heights to help provide cushioning during extended stretches of
            running.
          </div>
        </div>
        {/* heading and paragraph end */}

        {/* products grid start */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
          {filteredProducts.map((product) => (
            <ProductCard key={product?.id} data={product} />
          ))}
        </div> 
        
        {/* products grid end */}
                {/* pagination start */}
                {data && (
          <div className="flex gap-3 items-center justify-center my-16 md:my-0">
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === 1}
              onClick={handlePrevPage}
            >
              Previous
            </button>
            <span className="font-bold">{`${pageIndex} of ${pageCount}`}</span>
            <button
              className={`rounded py-2 px-4 bg-black text-white disabled:bg-gray-200 disabled:text-gray-500`}
              disabled={pageIndex === pageCount}
              onClick={handleNextPage}
            >
              Next
            </button>
          </div>
        )}
        {/* pagination end */}
        <Blog />

        {isValidating && (
          <div className="absolute top-0 left-0 w-full h-full bg-white/[0.5] flex flex-col gap-5 justify-center items-center">
            <img src="/logo.svg" width={150} />
            <span className="text-2xl font-medium">Loading...</span>
          </div>
        )}
        <br></br>
      </Wrapper>
    </main>
  );
}

export async function getStaticProps() {
  const products = await fetchDataFromApi(
    `/api/products?populate=*&pagination[page]=1&pagination[pageSize]=${maxResult}`
  );

  return {
    props: { products },
  };
}
