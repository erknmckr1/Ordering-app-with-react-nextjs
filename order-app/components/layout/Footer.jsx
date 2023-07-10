import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Footer = () => {
  library.add(fab);
  const [footer,setFooter] = useState();
  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooter(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);
  
  return (
    <div className="bg-secondary text-white ">
      <div className="container mx-auto pt-16 pb-6">
        <div className="flex md:justify-between justify-center text-center flex-wrap md:gap-y-0 gap-y-6 ">
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Contact Us</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <i className="fa fa-map-marker"></i>
                <span className="inline-block ml-2">Location</span>
              </div>
              <div>
                <i className="fa fa-phone"></i>
                <span className="inline-block ml-2">{footer?.phoneNumber}</span>
              </div>
              <div>
                <i className="fa fa-envelope"></i>
                <button className="inline-block ml-2">{footer?.email}</button>
              </div>
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[38px]">Feane</Title>
            <p className="mt-3">
              {footer?.desc}
            </p>
            <div className="flex items-center justify-center mt-5 gap-x-2">
             {footer?.links.map(item=>
             <a  href={item.link} target="_blank">
              <FontAwesomeIcon className="hover:text-primary text-center hover:bg-white w-7 h-7 rounded-full" icon={item.icon.split(" ")} />
             </a>
             )}
            </div>
          </div>
          <div className="md:flex-1">
            <Title addClass="text-[30px]">Opening Hours</Title>
            <div className="flex flex-col gap-y-2 mt-3">
              <div>
                <span className="inline-block ml-2">{footer?.time[0].days}</span>
              </div>
              <div>
                <span className="inline-block ml-2">{footer?.time[0].hour}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10">
          © 2022 All Rights Reserved By Free Html Templates
        </p>
      </div>
    </div>
  );
};

export default Footer;