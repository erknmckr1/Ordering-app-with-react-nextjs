import React from "react";
import Image from "next/image";
import Title from "./ui/Title";
function About() {
  return (
    <div className="bg-secondary py-[90px] ">
      <div className="container mx-auto flex sm:flex-auto flex-wrap-reverse  sm:flex-row justify-between items-center w-full">
        {/* image */}
        <div className="lg:w-1/2 w-full px-3 lg:px-0 flex justify-center">
          <div className="md:w-[700px] lg:w-[440px] md:h-[600px]  w-[600px] h-[300px] md:px-20 relative  rounded-3xl overflow-hidden  ">
            <Image
              src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp"
              alt=""
              fill={true}
            object-fit="cover"
            />
          </div>
        </div>

        {/* text */}
        <div className=" lg:w-1/2 mb-10 lg:mb-0 p-3 lg:p-0 w-full text-white flex flex-col sm:items-start items-center gap-y-4">
          <Title addClass="text-[40px]">We Are Feane</Title>
          <p className="my-5">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All
          </p>
          <button className="btn">Read More</button>
        </div>
      </div>
    </div>
  );
}

export default About;
