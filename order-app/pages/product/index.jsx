import Title from "@/components/ui/Title";
import Image from "next/image";
import React from "react";

function Index() {
  return (
    <div className="flex flex-col md:flex-row  w-screen h-screen  justify-center items-center mb-10 sm:my-10 ">
      {/* left side start */}
      <div className="w-full  h-[25rem]  sm:h-full  flex justify-center items-center ">
        <div className="relative  h-[50%]  sm:h-[60%] sm:w-[80%] w-[80%]  ">
          <Image
            src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp"
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded-3xl"
          />
        </div>
      </div>
      {/* left side end */}

      {/* right side start */}
      <div className="w-full flex justify-center md:px-10 px-5  ">
        <div className="flex w-[80%] flex-col max-h-[60%] items-center md:items-start md:justify-start sm:gap-y-8 gap-y-4">
          <Title addClass="sm:text-[40px]  text-[30px]">Erto'nun Burgeri</Title>
          <span className="text-primary font-bold sm:text-2xl text-md underline underline-offset-4">
            $10
          </span>
          <p className="text-[13px] md:pr-20">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
          </p>
          {/* size images */}

          {/* choose size start */}
          <div className="w-full flex flex-col md:items-start items-center">
            <h4 className="text-xl font-bold">Choose the size</h4>
            <div className="flex items-center md:gap-x-20 gap-x-10">
              <div className="relative w-10 h-10   ">
                <Image
                  src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <span className="bg-primary rounded-full px-[5px] font-medium  text-[12px] absolute -right-6 top-0">
                  small
                </span>
              </div>
              <div className="relative w-12 h-12">
                <Image
                  src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <span className="bg-primary rounded-full px-[5px] font-medium  text-[12px] absolute -right-6 top-0">
                  Medium
                </span>
              </div>
              <div className="relative w-14 h-14 ">
                <Image
                  src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp"
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <span className="bg-primary rounded-full px-[5px] font-medium  text-[12px] absolute -right-6 top-0">
                  Large
                </span>
              </div>
            </div>
          </div>
          {/* choose size end */}

          {/* choose extra start */}
          <div className="flex flex-col gap-y-2 md:items-start items-center w-full">
            <h4 className="font-bold text-xl">Choos additional ingredients</h4>
            <div className="flex gap-x-5">
              <div className="flex gap-x-2">
                <label htmlFor="ketçap" className="flex items-center gap-x-1">
                  <input
                    className="accent-primary w-5 h-5"
                    type="checkbox"
                    name="ketçap"
                  />
                  <span className="text-sm font-semibold">ketçap</span>
                </label>
              </div>
              <div className="flex gap-x-2">
                <label htmlFor="mayonez" className="flex items-center gap-x-1">
                  <input
                    className="accent-primary w-5 h-5"
                    type="checkbox"
                    name="mayonez"
                  />
                  <span className="text-sm font-semibold">Mayonez</span>
                </label>
              </div>
              <div className="flex gap-x-2">
                <label htmlFor="acı sos" className="flex items-center gap-x-1">
                  <input
                    className="accent-primary w-5 h-5"
                    type="checkbox"
                    name="acı sos"
                  />
                  <span className="text-sm font-semibold">Acı Sos</span>
                </label>
              </div>
            </div>
          </div>
          {/* choose extra end */}
          <div className="grid place-content-center">
            <button className="btn ">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
