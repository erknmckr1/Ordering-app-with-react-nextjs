import React, { useState } from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";
import { useEffect } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function MenuWrapper({ categoryList, productList }) {
  //! active state
  const [active, setActive] = useState(0);
  //! filter product state
  const [filteredProduct, setFilteredProduct] = useState();
  const [displayIndex,setDisplayIndex] = useState(3)
  const [buttonText,setButtonText] = useState("View More")
  const [disabledBtn,setDisabledBtn] = useState(false)

  const viewMore = () => {
    const remainingProducts = filteredProduct.length - displayIndex;
    //! Asagıdaki degıskene fonksıyon ıcındekı en kucuk deger atanacak 
    const productsToAdd = Math.min(remainingProducts, 3);

    if (productsToAdd > 0) {
      setButtonText(<ClipLoader color="#FDFEFE" />);
      setTimeout(() => {
        setDisplayIndex(prevDisplayIndex => prevDisplayIndex + productsToAdd);
        setButtonText("View More");
      }, 1000);
    }else{
      setDisabledBtn(true)
    }
  };

  useEffect(() => {
    if (categoryList.message.length > 0 && productList.products.length > 0) {
      const filteredProducts = productList.products.filter((product) => {
        setDisplayIndex(3)
        setDisabledBtn(false)
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
            filteredProduct.slice(0,displayIndex).map((product) => (
              <MenuItem key={product._id} product={product} />
            ))}
        </div>
        <div className="mt-8">
          <button disabled={disabledBtn ? true : false} onClick={viewMore} className="btn">{buttonText}</button>
        </div>
      </div>
    </div>
  );
}

export default MenuWrapper;
