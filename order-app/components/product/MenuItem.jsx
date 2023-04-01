import Image from "next/image";
import React from "react";
import { FaShoppingCart } from "react-icons/fa";

function MenuItem() {
  return (
    <div className="bg-secondary flex flex-col items-center w-[300px] h-[440px] rounded-[25px]">
      <div className="w-full h-1/2 flex justify-center items-center bg-[#F2F3F4] rounded-bl-[40px]">
        <div className="relative w-40 h-40 !rounded-full overflow-hidden hover:scale-110 transition-all ">
          <Image
            src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651068/menu-app/y0nax5ict97cbwcmpfdw.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div className="text-white w-full h-1/2 overflow-hidden flex flex-col justify-evenly items-start p-6">
        <h4 className="text-xl font-bold">Delicious Pasta</h4>
        <p className="text-[13px]">
          Veniam debitis quaerat officiis quasi cupiditate quo, quisquam velit,
          magnam voluptatem repellendus sed eaque
        </p>
        <div className=" w-full flex  justify-between items-center ">
          <span>$15</span>
          <button className="btn w-10 h-10 rounded-full !p-0 flex justify-center items-center ">
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
