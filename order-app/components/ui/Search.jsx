import Image from "next/image";
import { AiOutlineCloseCircle } from "react-icons/ai";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { useEffect, useState } from "react";
import axios from "axios";
import Input from "../form/Input";
import RingLoader from "react-spinners/RingLoader";
import { useRouter } from "next/router";

function Search({ setİsSerchModal }) {
  const {push} = useRouter();
  const [products,setProducts] = useState();
  const [filteredProduct,setFilteredProduct] = useState();

  useEffect(() => {
    const getProducts = async () => {
      try {
        setTimeout( async () => {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product`)
        setProducts(res.data.products)
        setFilteredProduct(res.data.products.slice(0,4))
        }, 1000);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    const filtered = products?.filter((product)=>product?.title.toLowerCase().includes(e.target.value.toLowerCase()))
    setFilteredProduct(filtered.slice(0,4))
  }

  const handleClick = (id) => {
    push(`/product/${id}`)
    setİsSerchModal(false)
  }

  return (
    // z index degerı ne kadar yüksek ise öge okadar yukarıda gorunur. Z ındex yalnız basına calısmaz positıon ozellıgı ıle bırlıkte kullanılmaıdır.
    <div className="fixed w-screen h-screen z-50 top-0 left-0 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0  grid place-content-center after:opacity-30 ">
      {/* click outside olayı  */}
      <OutsideClickHandler onOutsideClick={() => setİsSerchModal(false)}>
        {/* title component  */}
        <div className="w-full h-full grid place-content-start">
          <div className=" relative z-50 md:w-[600px] w-[370px] max-h-[600px] overflow-y-auto   bg-white border-2 border-primary p-10 rounded-[20px]">
            {/* Title komponentinde className 'i yemedıgı ıcın classları props olarak yolladık. className'ide prop olarak atmayı denedık ama ısımler cakıstıgından olmadı. */}
            <Title addClass="text-[40px] text-center text-red-400">Title</Title>
           <Input placeholder="Search..." onChange={(e)=>handleChange(e)} />
            {products?.length > 0 ? 
            <ul className="mt-10">
            {filteredProduct.length > 0  ? filteredProduct.map(product=>(
              <li onClick={()=> handleClick(product._id)} className="flex items-center justify-between py-3 px-10 mt-1 hover:bg-primary transition-all hover:scale-110 cursor-pointer border-b border-b-2">
              <div>
                <Image
                  className="rounded-full"
                  src={product?.image}
                  alt="sss"
                  width={48}
                  height={60}
                />
              </div>
              <span className="font-bold">{product?.title}</span>
              <span className="font-bold">${product?.prices[0]}</span>
            </li>
            )) :<span className="text-red-500 flex justify-center">The product you were looking for was not found!</span>}
         </ul> : <div className="flex justify-center mt-5"><RingLoader color="#D71602"/></div>}
            <button
              onClick={() => {
                setİsSerchModal(false);
              }}
              className="absolute right top-12"
            >
              <AiOutlineCloseCircle className="text-[30px] text-secondary hover:text-primary transition-all" />
            </button>
          </div>
        </div>

        {/*  */}
      </OutsideClickHandler>
    </div>
  );
}

export default Search;
