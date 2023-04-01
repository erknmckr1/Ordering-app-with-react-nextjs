import Image from "next/image";
import Title from "./ui/Title";
import {FaShoppingCart} from "react-icons/fa"

export const CampainsItem = () => {
  return (
    <div className="bg-secondary flex items-center  flex-1 py-5 px-[15px] rounded-l gap-x-4 ">
      <div className="relative after:content-[''] w-40 h-40 border-4 border-primary rounded-full overflow-hidden ">
        <Image
          src="https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/ggjqdmugwhmnk6ayribu.jpg"
          layout="fill"
          objectFit="cover"
          alt=""
          className="hover:scale-110 transition-all"
        />
      </div>
       <div className="flex flex-col justify-center text-white">
        <Title addClass="text-[24px]">Tasty Thursdays</Title>
        <div>
          <span className="font-dancing text-[40px]">20%</span>
          <span className="font-dancing text-[16px] ml-1">Off</span>
        </div>
        <button className="btn text-[16px] flex items-center gap-x-2">Order Now<FaShoppingCart/>  </button>
       </div>
    </div>
  );
};
// Kampanya kartını farklı bır komponentte olusturduk farklı komponentlerde kullanmamız acısından boylesı daha ıyı olacak komponent ıcınde tekrardan yazmayacagız.
function Campains() {
  return (
    
    <div className="  flex gap-y-2 sm:gap-y-2  md:gap-y-0 flex-wrap sm:gap-x-5  justify-between text-center container mx-auto py-10">
      <CampainsItem />
      <CampainsItem />
    </div>
  );
}

export default Campains;



