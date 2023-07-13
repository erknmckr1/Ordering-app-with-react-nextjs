import Campains from "@/components/Campains";
import Carousel from "@/components/Carousel";
import MenuWrapper from "@/components/product/MenuWrapper";
import About from "@/components/About";
import React from "react";
import Reservation from "@/components/Reservation";
import Customers from "@/components/customers/Customers";
import axios from "axios";

function İndex({ categoryList, productList, usersList }) {
  return (
    <div>
      <Carousel />
      <Campains />
      <MenuWrapper categoryList={categoryList} productList={productList} />
      <About />
      <Reservation />
      <Customers userList={usersList} />
    </div>
  );
}

export default İndex;

