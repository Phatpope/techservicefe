
import Wrapper from "@/components/Wrapper";
import FiltersSection from "@/components/FilterSection.jsx";
import { fetchDataFromApi } from "@/utils/api";
const Products = ({category}) => {
  console.log(category)
    return (
            <Wrapper>
            <FiltersSection categories={category} /> 
           

            </Wrapper>
          
      );

};


export default Products;

export async function getServerSideProps() {
  const category = await fetchDataFromApi("/api/categories?populate=*");
  

  return {
    props: {
        category,
    },
};

  
}
