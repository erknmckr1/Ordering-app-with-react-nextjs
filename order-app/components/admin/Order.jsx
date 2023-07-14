import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import axios from "axios";
import { useRouter } from "next/router";
function Order() {
  const {push} = useRouter();
  const [orders, setOrders] = useState([]);
  const status = ["preparing", "on the way", "delivered"];

  useEffect(() => {
    const getOrders = async () => {
      try {
        const order = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/order`
        );
        setOrders(order.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [orders]);

  //! update status prop
  const handleStatus = async (id) => {
    const order = orders.find((order) => order._id === id);
    const currentStatus = order.status;
    try {
      if (currentStatus < 2) {
        const res = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/order/${id}`,
          {
            status: currentStatus + 1,
          }
        );
        //! guncellenmemıs sıparısı cıkarp ıstekten donen datayı ekledık.
        setOrders([res.data,...orders.filter(item => item._id === id)])
      } else {
        console.log("Sipariş teslim edildi");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleOrderDetail = (id) => {
    push(`/order/${id}`)
  }
  return (
    <div className=" lg:p-8 flex-1 lg:mt-0 mt-5 m-2 sm:m-0">
      <Title addClass="text-[40px]">Orders</Title>
      <div className="overflow-x-auto w-full mt-5  h-[500px] overflow-y-scroll">
        <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
          <thead className="text-xs text-gray-400 uppercase bg-gray-700">
            <tr>
              <th scope="col" className="py-3 px-6">
                PRODUCT ID
              </th>
              <th scope="col" className="py-3 px-6">
                CUSTOMER
              </th>
              <th scope="col" className="py-3 px-6">
                TOTAL
              </th>
              <th scope="col" className="py-3 px-6">
                PAYMENT
              </th>
              <th scope="col" className="py-3 px-6">
                STATUS
              </th>
              <th scope="col" className="py-3 px-6">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody className="">
            {orders.length > 0 &&
              orders
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <tr
                    key={order._id}
                    className="transition-all bg-secondary border-gray-700 hover:bg-primary cursor-pointer "
                    onClick={()=>handleOrderDetail(order._id)}
                  >
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <span>{order._id.substring(0, 6)}...</span>
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {order?.customer}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      ${order?.total}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      Cash
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      {status[order.status]}
                    </td>
                    <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                      <button
                        onClick={() => handleStatus(order._id)}
                        className="btn !bg-green-500 "
                        disabled={order?.status > 1}
                      >
                        Next Stage
                      </button>
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
