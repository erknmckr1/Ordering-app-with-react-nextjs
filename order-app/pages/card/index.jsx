import Title from "@/components/ui/Title";
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSession } from "next-auth/react";
import { reset } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { cancelProduct } from "@/redux/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faLayerGroup } from '@fortawesome/free-solid-svg-icons';

function index({users}) {
    const [close,setClose] = useState(false)
    const dispatch = useDispatch();
    const router = useRouter();
    const {data:session} = useSession();
    const { products, quantity, total,discount } = useSelector((state) => state.cart);
    //! optional chaining "?"
    const user = users?.filter((user)=> user?.email === session?.user.email)
    
    const order = {
      customer:user[0]?.fullName,
      address:user ? user[0]?.address : "",
      total:total,
      status:0
    }

    const createOrder = async () => {
      try{
        if(session){
          if(confirm("Are you sure to order?")){
            const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`,order);
            if(res.status===200){
              router.push(`order/${res.data._id}`);
              toast.success("Order created!");
              dispatch(reset());
            }
          }
        }else{
          toast.error("You must sign in")
        }
      }catch(err){
        console.log(err)
      }
    }

    const cancelOrder = (product) => {
      dispatch(cancelProduct(product))
      
    }

    const handleClose = () => {
      setClose(close === true ? false : true)

      if(close === true){

      }
    }
  return (
    <div className="min-h-[calc(100vh_-_385px)] relative ">
      <div className="flex justify-between items-center md:flex-row flex-col py-3 md:p-0">
        <div className="md:!max-h-[450px] overflow-y-scroll w-full m-2 md:flex-1  ">
          <table className="w-full text-center text-sm text-gray-500">
            <thead className="text-gray-400 text-xs bg-gray-700 uppercase ">
              <tr>
                <th className="py-3 px-6">PRODUCT</th>
                <th className="py-3 px-6">EXTRAS</th>
                <th className="py-3 px-6">PRICE</th>
                <th className="py-3 px-6">QUANTITY</th>
                <th className="py-3 px-6">cancel</th>
              </tr>
            </thead>
            <tbody className="">
              {products &&
                products.map((product,index) => (
                  <tr key={index} className="bg-secondary hover:bg-primary transition-all hover:text-white ">
                    <td className="md:py-4 py-3 px-6 font-medium md:flex flex-col items-center gap-x-1 ">
                      <Image
                        className="rounded-full"
                        src={product.image}
                        alt=""
                        width={70}
                        height={70}
                      />
                      <span>{product.title}</span>
                    </td>
                    <td className="md:py-4 py-3 px-6 font-medium">
                      {product.extras.map((extra) => (
                        <span key={extra.id}>{extra.item},</span>
                      ))}
                    </td>
                    <td className="md:py-4 py-3 px-6 font-medium">
                      ${product.price}
                    </td>
                    <td className="md:py-4 py-3 px-6 font-medium">
                      {product.quantity}
                    </td>
                    <td className="md:py-4 py-3 px-6 font-medium">
                      <button onClick={()=>cancelOrder(product)} className="btn !bg-red-800">Cancel</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* right side  */}
        <div className={`${close === false ? "translate-x-[200px]" : "translate-x-none"} absolute sm:static sm:min-h-[calc(100vh_-_385px)] duration-[2000ms]  transition-all right-0 mt-1 md:mt-0 top-0 w-1/2 sm:w-full md:w-auto  p-6  bg-secondary text-white  `}>
          <div className="flex flex-col items-center justify-center relative">
          <Title addClass="text-[30px] sm:text-[40px] py-6">CARD TOTAL</Title>
          <div className="py-3 w-full border-b-2 border-primary flex justify-between ">
            <span className="font-bold ">Subtotal:</span>
            <span>$ {total}</span>
          </div>
          <div className="py-3 w-full border-b-2 border-primary flex justify-between">
            <span className="font-bold">Discount:</span>
            <span>${discount}</span>
          </div>
          <div className="py-3 w-full border-b-2 border-primary flex justify-between">
            <span className="font-bold">Total:</span>
            <span>$ {total}</span>
          </div>
          <button onClick={createOrder} className="btn mt-5">CHECKOUT NOW</button>
          <button onClick={()=>setClose(close === true ? false : true)} className="absolute top-0 left-0"><FontAwesomeIcon className="text-primary" icon={faLayerGroup} /></button>
          </div>
          
        </div>
        <button onClick={()=>setClose(true)} className={`${close === true ? "hidden duration-[2000] transition-all" :""} absolute sm:hidden right-5 top-20` }><FontAwesomeIcon className="text-primary" icon={faLayerGroup} /></button>
      </div>
    </div>
  );
}

export default index;

export const getServerSideProps = async () => {
  
    const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);

  

  return{
    props:{
      users: user.data ? user.data : ""
    }
  }
}
