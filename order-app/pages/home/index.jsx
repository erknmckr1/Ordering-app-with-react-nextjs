import Campains from "@/components/Campains";
import Carousel from "@/components/Carousel";
import MenuWrapper from "@/components/product/MenuWrapper";
import About from "@/components/About";
import React from "react";
import Reservation from "@/components/Reservation";
import Customers from "@/components/customers/Customers";

function İndex({ categoryList }) {
  return (
    <div>
      <Carousel />
      <Campains />
      <MenuWrapper categoryList={categoryList} />
      <About />
      <Reservation />
      <Customers />
    </div>
  );
}

export default İndex;
