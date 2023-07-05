import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";

const Order = ({ user }) => {
  const [orders, setOrders] = useState();
  const status = ["preparing", "on the way", "delivered"];
  const filteredOrders = orders?.filter((order)=>order.customer === user.fullName)
  
  useEffect(() => {
    const getOrders = async () => {
      try {
        const order = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order`
        );
        setOrders(order.data);
      } catch (error) {
        console.log(error);
      }
    };
    getOrders();
  }, []);
  return (
    <div className=" lg:p-8 flex-1 lg:mt-0 mt-5 m-2 sm:m-0">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5 overflow-y-scroll max-h-[450px]">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                ID
              </th>
              <th scope="col" className="py-3 px-6">
                ADRESS
              </th>
              <th scope="col" className="py-3 px-6">
                DATE
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
           {filteredOrders && filteredOrders.map(order=>(
             <tr key={order._id} className="transition-all bg-secondary border-gray-700 hover:bg-primary ">
             <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white flex items-center gap-x-1 justify-center">
               <span>{order?._id}</span>
             </td>
             <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
               {order?.address}
             </td>
             <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
               {order?.createdAt}
             </td>
             <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
               ${order?.total}
             </td>
             <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
               {status[order?.status]}
             </td>
           </tr>
           ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;