import React, { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import { useEffect } from "react";
function MenuWrapper({ categoryList, productList }) {
  //! active state
  const [active, setActive] = useState(0);

  //! filter product state
  const [filteredProduct, setFilteredProduct] = useState();

  useEffect(() => {
    if (categoryList.message.length > 0 && productList.products.length > 0) {
      const filteredProducts = productList.products.filter((product) => {
        return product.category.toLowerCase() === categoryList.message[active].title.toLowerCase();
      });
  
      setFilteredProduct(filteredProducts);
    }
  }, [categoryList, productList, active]);

  return (
    <div className="container mx-auto mb-16">
      <div className=" flex flex-col items-center">
        <Title addClass="text-[40px]">Our Menu</Title>
        {/* Fılter Buttons */}
        <div className="flex mt-11 mb-5 w-full sm:w-auto overflow-x-scroll sm:overflow-auto">
          {categoryList.message.map((category, index) => (
            <button
              onClick={() => setActive(index)}
              key={category._id}
              className={`${
                active === index
                  ? "bg-primary px-6 mx-1 py-2 rounded-3xl  text-white"
                  : " bg-secondary px-6 mx-1 py-2 rounded-3xl text-white "
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        {/* Menu Items */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 sm:min-h-[400px]">
          {filteredProduct &&
            filteredProduct.map((product) => (
              <MenuItem key={product._id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default MenuWrapper;
