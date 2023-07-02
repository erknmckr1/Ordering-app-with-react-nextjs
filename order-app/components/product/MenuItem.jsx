import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function MenuItem({ product }) {
  const {extras,title,category,prices,image,description} = product;
  
  return (
    <div className="bg-secondary flex flex-col items-center w-[300px] h-[440px] rounded-[25px]">
      <div className="w-full h-1/2 flex justify-center items-center bg-[#F2F3F4] rounded-bl-[40px]">
        <Link href={`product/${product._id}`}>
          <div className="relative w-40 h-40 !rounded-full overflow-hidden hover:scale-110 transition-all ">
            <Image
              src={image}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        </Link>
      </div>

      <div className="text-white w-full h-1/2 overflow-hidden flex flex-col justify-evenly items-start p-6">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-[13px]">
         {description}
        </p>
        <div className=" w-full flex  justify-between items-center ">
          <span>${prices[0]}</span>
          <button className="btn w-10 h-10 rounded-full !p-0 flex justify-center items-center ">
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
