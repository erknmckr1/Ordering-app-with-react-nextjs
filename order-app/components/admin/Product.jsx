import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

function Product() {
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/product`
        );
        setProduct(res.data.products);
      } catch (err) {
        console.log(err);
      }
    };
    getProduct();
  }, []);

  //! product delete
  const handleProductDelete = async (id) => {
    try{
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${id}`)
      if(res.status === 200) {
        toast.success("Deletion successful!")
      }
    }catch(err){
      console.log(err)
    }
  }
  return (
    <div className=" lg:p-8 flex-1 lg:mt-0 mt-5 m-2 sm:m-0">
      <Title addClass="text-[40px]">Products</Title>
      <div className="overflow-x-auto w-full mt-5 !max-h-[450px] overflow-y-scroll ">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                IMAGE
              </th>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                TITLE
              </th>
              <th scope="col" className="py-3 px-6">
                PRICE
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="">
            {product.length > 0 &&
              product.map((product) => (
                <tr key={product._id} className="transition-all bg-secondary border-gray-700 hover:bg-primary ">
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center ">
                    <Image
                      className="rounded-full"
                      width={50}
                      height={50}
                      alt=""
                      src={product.image}
                    />
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product._id.substring(0,8)}...
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.title}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {product.prices[0]}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <button onClick={()=>handleProductDelete(product._id)} className="btn !bg-danger">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Product;
