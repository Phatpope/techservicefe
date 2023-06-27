

import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import { fetchDataFromApi } from "@/utils/api";


const List = () => {
//   const { data, loading, error } = useFetch(
//     `/products?populate=*&[filters][categories][id]=${catId}${subCats.map(
//       (item) => `&[filters][sub_categories][id][$eq]=${item}`
//     )}&[filters][price][$lte]=${maxPrice}&sort=price:${sort}`
//   );

  const [products, setProducts] = useState(null);

  useEffect(() => {
    fetchProducts();
    console.log("xxxxx")
    console.log(products)

    console.log("xxxxx")

}, []);


  const fetchProducts = async () => {
    const { data } = await fetchDataFromApi("/api/products?populate=*");
    setProducts(data);
};



  return (
    <div className="list">
    {products ? 
    products?.map((product) => (
        <ProductCard key={product?.id} data={product} />
    ))
     : (
      <div>Loading...</div>
    )}
  </div>
  );
};

export default List;