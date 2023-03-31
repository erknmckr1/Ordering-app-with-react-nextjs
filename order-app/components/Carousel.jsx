import React from "react";
import Image from "next/image";
import Title from "./ui/Title";
import Slider from "react-slick";

function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 20000,

    appenDots: (dots) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div className="w-3 h-3 border bg-white rounded-full mt-10"></div>
    ),
  };

  return (
    // carousel e 100vh dedıgımız zaman ekran kadar height alıyor fakat header'da bellı bır height'ı oldugu ıcın carousel componentını o kadar asagı ıtıyor.
    <div className="h-screen  -mt-[88px] container   mx-auto">
        {/* carousel ımg */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="h-full w-full">
          <Image
            src="/Images/hero-bg.jpg"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      {/*  */}

      <Slider {...settings}>
        <div>
          <div className="text-white mt-48  flex flex-col gap-y-10 items-start ">
            <Title addClass="text-6xl">Fast Food Restaurant</Title>
            <p className="text-[14px] w:1/2 sm:w-2/5">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="btn">Order Now</button>
          </div>
        </div>
        {/* slider end */}
        <div>
          <div className="text-white z-30 relative top-48 flex flex-col gap-y-10 items-start ">
            <Title addClass="text-6xl">Fast Food Restaurant</Title>
            <p className="text-[14px] w:1/2 sm:w-2/5">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="btn">Order Now</button>
          </div>
        </div>
        {/*  */}
        <div>
          <div className="text-white z-30 relative top-48 flex flex-col gap-y-10 items-start ">
            <Title addClass="text-6xl">Fast Food Restaurant</Title>
            <p className="text-[14px] w:1/2 sm:w-2/5">
              Doloremque, itaque aperiam facilis rerum, commodi, temporibus
              sapiente ad mollitia laborum quam quisquam esse error unde.
              Tempora ex doloremque, labore, sunt repellat dolore, iste magni
              quos nihil ducimus libero ipsam.
            </p>
            <button className="btn">Order Now</button>
          </div>
        </div>
        {/*  */}
      </Slider>
    </div>
  );
}

export default Carousel;
