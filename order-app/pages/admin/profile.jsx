import Image from "next/image";
import { AiFillHome, AiFillCloseCircle } from "react-icons/ai";
import { BsFillArrowRightCircleFill,BiLogoProductHunt } from "react-icons/bs";
import { GiDutchBike } from "react-icons/gi";
import { BiExit,BiCategory } from "react-icons/bi";
import { useState } from "react";
import Order from "@/components/admin/Order";
import Product from "@/components/admin/Product";
import Category from "@/components/admin/Category";
import Footer from "@/components/admin/Footer";
function Profile() {
  const [close, SetClose] = useState(false);
  const [tab, setTab] = useState(0);

  const handleClose = () => {
    SetClose(true);
  };
  const handleOpen = () => {
    SetClose(false);
  };
  return (
    //! buraya donus yapılacak acılır kapanır panel olarak ayarlanacak...
    <div className="lg:px-10 min-h-[calc(100vh_-_433px)] flex  md:flex-row flex-col relative ">
      <div
        className={`sm:w-80 w-60 absolute lg:static ${
          close ? "-translate-x-[360px] " : "translate-x-none"
        } z-50 transition-all duration-[1500ms] bg-white lg:border-0 h-full  `}
      >
        <div className="flex  flex-col items-center py-8 border-2">
          <Image
            className="rounded-full"
            alt=""
            src="/images/admin.png"
            width={100}
            height={100}
          />
          <span className="text-center py-2 font-bold text-[20px]">ADMİN</span>
        </div>
        <div className=" bg-white">
          <ul className="font-semibold">
            <li
              onClick={() => setTab(0)}
              className={` ${
                tab === 0 && "bg-primary text-white"
              } flex items-center py-2 px-2 hover:bg-primary hover:text-white border-2`}
            >
              <AiFillHome />
              <button className="pl-1">Product</button>
            </li>
            <li
              onClick={() => setTab(1)}
              className={` ${
                tab === 1 && "bg-primary text-white"
              } flex items-center py-2 px-2 hover:bg-primary hover:text-white border-2`}
            >
              <GiDutchBike />
              <button className="pl-1">Orders</button>
            </li>
            <li
              onClick={() => setTab(2)}
              className={` ${
                tab === 2 && "bg-primary text-white"
              } flex items-center py-2 px-2 hover:bg-primary hover:text-white border-2`}
            >
              <BiCategory />
              <button className="pl-1">Categories</button>
            </li>
            <li
              onClick={() => setTab(3)}
              className="flex items-center py-2 px-2 hover:bg-primary hover:text-white border-2"
            >
              <button className="pl-1">Footer</button>
            </li>
            <li
              onClick={() => setTab(4)}
              className="flex items-center py-2 px-2 hover:bg-primary hover:text-white border-2"
            >
              <BiExit />
              <button className="pl-1">Exit</button>
            </li>
          </ul>
        </div>
        <button onClick={handleClose}>
          <AiFillCloseCircle className=" lg:hidden absolute z-40 top-2 right-2 text-[20px] bg-white text-secondary" />
        </button>
      </div>
      {/*  */}
      {tab === 0 && <Product />}
      {tab === 1 && <Order />}
      {tab === 2 && <Category />}
      {tab === 3 && <Footer />}
      <button
        onClick={handleOpen}
        className={`${
          close ? "block" : "hidden "
        } duration-[1500ms] transition-all lg:hidden absolute top-2 left-0 text-[20px] drop-shadow-2xl w-8 h-8 bg-primary rounded-full`}
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  );
}

export default Profile;
