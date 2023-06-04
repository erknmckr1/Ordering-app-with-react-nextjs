import Title from "@/components/ui/Title";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function Index() {
  const extraItems = [
    {
      id: "1",
      name: "Extra1",
      price: 1,
    },
    {
      id: "2",
      name: "Extra2",
      price: 2,
    },
    {
      id: "3",
      name: "Extra3",
      price: 3,
    },
  ];

  const sizes = [
     {
      name: 'Small',
      price: 10,
      img:"https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp",
      size:"w-10 h-10"
    },
    {
      name: 'Medium',
      price: 20,
      img:"https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp",
      size:"w-12 h-12"
    },
     {
      name: 'Large',
      price: 30,
      img:"https://res.cloudinary.com/dtar4nbiw/image/upload/v1679651070/menu-app/x2ib17evpshxveqgszbg.webp",
      size:"w-14 h-14"
    }
  ];

  
  // toplam price'ı tutacagımız state
  const [price,setPrice]=useState(0)

  // size ve extra'dan gelen price'lar
  const[selectedSize,setSelectedSize] = useState(null)
  const [selectedExtra,setSelectedExtra] = useState(0)

  // sectıgımız extra nesnelerını tutacagımız dızı bu dızıyı card componentine yollayacagız.
  const [extras,setExtras]=useState([])

  
  const handleSize = (price) =>{
    setSelectedSize(price)
  }

  // extra sececegımız fonksıyon checked'ın true false olma durumuna gore totalprice ve extras dizisine ekleme yada cıkarma yaptık.
  const handleExtra = (e,item) =>{
    const checked = e.target.checked
    if(checked){
      setExtras([...extras,item])
      setSelectedExtra(selectedExtra + item.price)
      
    }else{
      setSelectedExtra(selectedExtra - item.price)
      const filteredExtra = extras.filter((extra)=> extra.id !== item.id)
      setExtras(filteredExtra)
    }
  }
  
  const canculatorTotalPrice = () =>{
    setPrice(selectedSize + selectedExtra)
  }

  useEffect(()=>{
    canculatorTotalPrice()
  },[selectedSize,selectedExtra])
  return (
    <div className="flex flex-col md:flex-row  w-screen h-[calc(100vh_-_100px)] sm:h-[calc(100vh_-_400px)] justify-center items-center mb-10 sm:my-20 ">
      {/* left side start */}
      <div className="w-full  h-full  sm:h-full  flex justify-center items-center ">
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
      <div className="w-full flex justify-center lg:px-10   ">
        <div className="flex w-[80%] flex-col max-h-[60%] items-center md:items-start md:justify-start sm:gap-y-8 gap-y-4">
          <Title addClass="sm:text-[40px]  text-[40px]">Erto'nun Burgeri</Title>
          <span className="text-danger font-bold sm:text-2xl text-md underline underline-offset-4">
            Total Price ${price}
          </span>
          <p className="text-[13px] py-2 md:pr-20">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
          </p>
          {/* size images */}

          {/* choose size start */}
          <div className="w-full flex flex-col md:items-start items-center">
            <h4 className="text-xl font-bold">Choose the size</h4>
            <div className="flex items-center md:gap-x-20 gap-x-10">
              {sizes.map((size)=>(
                <div onClick={()=>handleSize(size.price)} className={`relative ${size.size} hover:scale-95 cursor-pointer hover:border-primary border-2 rounded-full `}>
                <Image
                  src={size.img}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <span className="bg-primary rounded-full px-[5px] font-medium  text-[12px] absolute -right-6 top-0">
                  {size.name}
                </span>
              </div>
              ))}
            </div>
          </div>
          {/* choose size end */}

          {/* choose extra start */}
          <div className="flex flex-col gap-y-2 md:items-start items-center w-full py-2 sm:py-0">
            <h4 className="font-bold text-xl">Choos additional ingredients</h4>
            <div className="flex gap-x-5">
              {extraItems.map((item)=>(
                <div  key={item.id} className="flex gap-x-2">
                <label htmlFor={item.name} className="flex items-center gap-x-1">
                  <input
                    className="accent-primary w-5 h-5"
                    type="checkbox"
                    name={item.name}
                    onClick={(e)=>handleExtra(e,item)}
                  />
                  <span className="text-sm font-semibold">{item.name}</span>
                </label>
              </div>
              ))}
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
