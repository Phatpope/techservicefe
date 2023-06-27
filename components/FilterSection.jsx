import Checkbox from "./Checkbox";

export default function Filters({ categories, getSelectedCategories }) {
  console.log(categories?.data);
  console.log(categories?.data[0]?.attributes?.name, "lzzzzzz");

  return (
    <div>
      <div className="flex items-center mt-5">
        {categories?.data?.map((category) => (
          <Checkbox
            key={category.id} // Provide a unique identifier as the key
            label={category.attributes?.name}
            id={category.id}
          />
        ))}
      </div>
    </div>
  );
}
