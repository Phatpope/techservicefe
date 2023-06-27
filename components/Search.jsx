import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { fetchDataFromApi } from "@/utils/api";
import { useRouter } from "next/router";
import styles from "./search.module.css";


const Search = ({ setSearchModal }) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [data, setData] = useState(null);

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const searchProducts = async () => {
    if (!query.length) {
      setData(null);
      return;
    }

    const result = await fetchDataFromApi(`/api/products?populate=*&filters[info][$contains]=${query}`);
    setData(result);
  };

  useEffect(() => {
    searchProducts();
  }, [query]);

  return (
    <div className="search-modal fixed w-full h-full z-50 top-0 left-0 bg-white">
      <div className="absolute top-0 right-0 m-4">
        <MdClose className="text-gray-500 hover:text-gray-700 cursor-pointer" onClick={() => setSearchModal(false)} />
      </div>
      <div className="p-4">
        <input
          autoFocus
          type="text"
          placeholder="Search for products"
          value={query}
          onChange={onChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-gray-500"
        />
      </div>
      <div className="p-4">
        {!data?.data?.length && (
          <div className="text-center text-gray-500">
            Start typing to see products you are looking for.
          </div>
        )}
        <div className="mt-4">
          {data?.data?.map((item) => (
            <div
              className="flex items-center border-b border-gray-300 py-2 hover:bg-gray-100 cursor-pointer"
              key={item?.attributes?.slug}
              onClick={() => {
                router.push("/product/[slug]", `/product/${item.attributes.slug}`);
                setSearchModal(false);
              }}

            >
              <div className="flex-shrink-0">
                

              </div>
              <div className="ml-3">
                <div className="text-sm font-medium text-gray-900">
                  {item?.attributes?.subtitle}
                </div>
                <div className="text-sm text-gray-500">
                  {item?.attributes?.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
