import React from "react";
import Title from "../ui/Title";
import MenuItem from "./MenuItem";

function MenuWrapper({categoryList}) {
  
  return (
    <div className="container mx-auto mb-16">
      <div className=" flex flex-col items-center">
        <Title addClass="text-[40px]">Our Menu</Title>
        {/* Fılter Buttons */}
        <div className="flex mt-11 mb-5">
          <button className="bg-secondary px-6 py-2 rounded-3xl text-white">
            All
          </button>
         {categoryList.message.map((category)=>(
           <button className="bg-secondary px-6 mx-1 py-2 rounded-3xl text-white">
           {category.title}
         </button>
         ))}
        </div>
        {/* Menu Items */}
        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
            <MenuItem/>
        </div>
      </div>
    </div>
  );
}

export default MenuWrapper;
