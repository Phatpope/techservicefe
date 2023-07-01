import Wrapper from "@/components/Wrapper";
import React, { useEffect, useState, createContext } from "react";
import { fetchDataFromApi } from "@/utils/api";
import ProductCard from "@/components/ProductCard";
import Filter from "@/components/Filter";
import Sort from "@/components/Sort";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";

const maxResult = 9;

// Create a new context for storing the filtered products
const FilteredProductsContext = createContext([]);

const AllProduct = ({ category, products }) => {
  const [selectedRamSizes, setSelectedRamSizes] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const { query, events } = useRouter();

  useEffect(() => {
    setPageIndex(1);
  }, [query]);

  let [filteredProducts, setFilteredProducts] = useState(products.data);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-14 px-5 md:px-0">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
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
