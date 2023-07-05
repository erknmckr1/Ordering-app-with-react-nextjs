import Title from "@/components/ui/Title";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import axios from "axios";
import { useSession } from "next-auth/react";
import { reset } from "@/redux/cartSlice";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
function index({users}) {
    const dispatch = useDispatch();
    const router = useRouter();
    const {data:session} = useSession();
    const { products, quantity, total } = useSelector((state) => state.cart);
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
  return (
    <div className="min-h-[calc(100vh_-_433px)] ">
      <div className="flex justify-between items-center md:flex-row flex-col py-3 md:p-0">
        <div className="md:!max-h-[450px] overflow-y-scroll w-full m-2 md:flex-1  ">
          <table className="w-full text-center text-sm text-gray-500">
            <thead className="text-gray-400 text-xs bg-gray-700 ">
              <tr>
                <th className="py-3 px-6">PRODUCT</th>
                <th className="py-3 px-6">EXTRAS</th>
                <th className="py-3 px-6">PRICE</th>
                <th className="py-3 px-6">QUANTITY</th>
              </tr>
            </thead>
            <tbody className="">
              {products &&
                products.map((product,index) => (
                  <tr key={index} className="bg-secondary hover:bg-primary transition-all hover:text-white ">
                    <td className="md:py-4 py-3 px-6 font-medium md:flex flex-col items-center gap-x-1 ">
                      <Image
                        className="rounded-full"
                        src={product.product.image}
                        alt=""
                        width={70}
                        height={70}
                      />
                      <span>{product.product.title}</span>
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
                      {quantity && quantity}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* right side  */}
        <div className="min-h-[calc(100vh_-_433px)] w-full md:w-auto  p-6 flex flex-col items-center justify-center bg-secondary text-white mt-3 md:mt-0  ">
          <Title addClass="text-[40px] py-6">CARD TOTAL</Title>
          <div className="py-3 w-full border-b-2 border-primary flex justify-between ">
            <span className="font-bold ">Subtotal:</span>
            <span>$ {total}</span>
          </div>
          <div className="py-3 w-full border-b-2 border-primary flex justify-between">
            <span className="font-bold">Discount:</span>
            <span>$ 0</span>
          </div>
          <div className="py-3 w-full border-b-2 border-primary flex justify-between">
            <span className="font-bold">Total:</span>
            <span>$ {total}</span>
          </div>
          <button onClick={createOrder} className="btn mt-5">CHECKOUT NOW</button>
        </div>
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
