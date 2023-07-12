import Image from "next/image";
import Title from "./ui/Title";
import { FaShoppingCart } from "react-icons/fa";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "@/redux/cartSlice";
export const CampainsItem = ({product}) => {
  const dispatch = useDispatch();
  
 const handleOrderProduct = () => {
  const newOrder = dispatch(addProduct({...product,extras:[{item:"Ketchap",price:3},{item:"Mayonnaise",price:3}],price:product.prices[0],quantity:1}))
 }
  return (
    <div className="bg-secondary flex items-center justify-between flex-1 py-5 px-[15px] rounded-l gap-x-4 mx-1 ">
      <div className="relative after:content-[''] w-40 h-40 border-4 border-primary rounded-full overflow-hidden ">
        <Image
          src={product.image}
          layout="fill"
          objectFit="cover"
          alt=""
          className="hover:scale-110 transition-all"
        />
      </div>
      <div className="flex flex-col justify-center text-white">
        <Title addClass="text-[24px]">Delicious Days</Title>
        <div className="w-full flex justify-between items-center">
          <div>
          <span className="font-dancing text-[40px]">{product.discount}%</span>
          <span className="font-dancing text-[16px] ml-1">Off</span>
          </div>
          <div className="font-dancing text-[30px] text-red-600">
            ${product.prices[0]}
          </div>
        </div>
        <button onClick={handleOrderProduct} className="btn text-[16px] flex items-center gap-x-2">
          Order Now
          <FaShoppingCart />{" "}
        </button>
      </div>
      <div>
        <span>{}</span>
      </div>
    </div>
  );
};
// Kampanya kartını farklı bır komponentte olusturduk farklı komponentlerde kullanmamız acısından boylesı daha ıyı olacak komponent ıcınde tekrardan yazmayacagız.
function Campains() {
  const [products,setProduct] = useState();
  function NextBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: <PrevBtn />,
    nextArrow: <NextBtn />,
  };

  useEffect(()=>{
    const getProducts = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`)
        setProduct(res.data.products)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts()
  },[])
  
  const filteredProducts = products?.filter(item=>item.discount > 0)
  return (
    <div className="container mx-auto py-20 ">
      <Slider {...settings}>
        {filteredProducts?.map(item=>(
         
            <CampainsItem key={item._id} product={item}/>
      
        ))}
      </Slider>
    </div>
  );
}

export default Campains;
