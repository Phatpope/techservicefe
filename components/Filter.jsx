import Checkbox from "./Checkbox";
import { formatNumber } from "./Common/Format";
import Color from "./Color";

const Filter = ({ categories, handleCategory ,products,handleRamFilter ,handlePriceFilter}) => {

  const ramSizesSet = products?.data?.reduce((sizes, product) => {
    if (product.attributes.size && product.attributes.size.data) {
      product.attributes.size.data.forEach((ramSize) => {
        if (ramSize.size) {
          sizes.add(ramSize.size);
        }
      });
    }
    return sizes;
  }, new Set());

  const ramSizes = Array.from(ramSizesSet); // Convert set to array

  // const ramSizes = Array.from(new Set(products?.data?.map((product) => product?.attributes?.size)));

  // console.log(ramSizes,"lzzzzzzzzzzzzoooooo111111111")
  // console.log(ramSizes[1]?.data[0]?.size,"lzzzzzzzzzzzzoooooo111111111") //it print "8 GB"
  // console.log(ramSizes[1]?.data[1]?.size,"lzzzzzzzzzzzzoooooo111111111") //it print "16 GB"




  return (
    
<div className="bg-white">
  <div>
    
    <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
    
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>

      <div className="fixed inset-0 z-40 flex">
        
        <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
          <div className="flex items-center justify-between px-4">
            <h2 className="text-lg font-medium text-gray-900">Filters</h2>
            <button type="button" className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form className="mt-4 border-t border-gray-200">
            <h3 className="sr-only">Categories</h3>
            {categories?.data?.map((category) => (
           <Checkbox
           key={category.id} // Provide a unique identifier as the key
           label={category.attributes?.name}
           id={category.id}
           handleCategory={handleCategory}
         />
        ))}

          
          </form>
        </div>
      </div>
    </div>

    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      

      <section aria-labelledby="products-heading" className="pb-24 pt-6">
        <h2 id="products-heading" className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          <form className="hidden lg:block">
            <h3 className="sr-only">Categories</h3>
            {categories?.data?.map((category) => (
           <Checkbox
           key={category.id} // Provide a unique identifier as the key
           label={category.attributes?.name}
           id={category.id}
           handleCategory={handleCategory}
         />
        ))}

            <div className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-0" aria-expanded="false">
                  <span className="font-medium text-gray-900">Color</span>
                  <span className="ml-6 flex items-center">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div className="pt-6" id="filter-section-0">
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Color/>
                  </div>
                  
                  
                </div>
              </div>
            </div>
            <div className="border-b border-gray-200 py-6">
  <h3 className="-my-3 flow-root">
    <button
      type="button"
      className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
      aria-controls="filter-section-0"
      aria-expanded="false"
    >
      <span className="font-medium text-gray-900">Filter By Price</span>
      <span className="ml-6 flex items-center">
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
        </svg>
        <svg
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </button>
  </h3>
  <div className="pt-6" id="filter-section-0">
    <div className="space-y-4">
      <div className="flex items-center">
        <span>{formatNumber(100000)}</span> {/* Format the minimum price */}
        <input
          type="range"
          min={100000}
          max={100000000}
          step={1000}
          onChange={(e) => handlePriceFilter(parseInt(e.target.value))}
        />
        <span>{formatNumber(100000000)}</span> {/* Format the maximum price */}
      </div>
    </div>
  </div>
</div>

            <div className="border-b border-gray-200 py-6">
              <h3 className="-my-3 flow-root">
                <button type="button" className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500" aria-controls="filter-section-2" aria-expanded="false">
                  <span className="font-medium text-gray-900">Ram Size</span>
                  <span className="ml-6 flex items-center">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </h3>
              <div className="pt-6" id="filter-section-2">
              <div className="space-y-4">
              {ramSizes.map((ramSize) => (
                <div className="flex items-center" key={ramSize}>
                  <input
                    id={`filter-size-${ramSize}`}
                    name="size[]"
                    value={ramSize}
                    type="checkbox"
                    onChange={(e) => handleRamFilter(e.target.value, e.target.checked)}

                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor={`filter-size-${ramSize}`}
                    className="ml-3 text-sm text-gray-600"
                  >
                    {ramSize}GB
                  </label>
                </div>
              ))}
            </div>
              </div>
            </div>
          </form>

          <div className="showproductsfilterhere">
          </div>
        </div>
      </section>
    </main>
  </div>
</div>

  
);
  }

export default Filter;
