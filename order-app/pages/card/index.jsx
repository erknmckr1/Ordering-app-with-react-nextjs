import Title from "@/components/ui/Title";
import React from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
function index() {
  const { products, quantity, total } = useSelector((state) => state.cart);
  return (
    <div className="min-h-[calc(100vh_-_433px)]">
      <div className="flex justify-between items-center md:flex-row flex-col py-3 md:p-0">
        <div className="md:min-h-[calc(100vh_-_433px)] flex items-center md:flex-1 p-6">
          <table className="w-full text-center text-sm text-gray-500 ">
            <thead className="text-gray-400 text-xs bg-gray-700 ">
              <tr>
                <th className="py-3 px-6">PRODUCT</th>
                <th className="py-3 px-6">EXTRAS</th>
                <th className="py-3 px-6">PRICE</th>
                <th className="py-3 px-6">QUANTITY</th>
              </tr>
            </thead>
            <tbody>
              {products &&
                products.map((product) => (
                  <tr className="bg-secondary hover:bg-primary transition-all hover:text-white  ">
                    <td className="md:py-4 py-3 px-6 font-medium md:flex flex-col items-center gap-x-1 ">
                      <Image
                        className="rounded-full"
                        src="/FusilliRotini.jpeg"
                        alt=""
                        width={70}
                        height={70}
                      />
                      <span>{product[0].name}</span>
                    </td>
                    <td className="md:py-4 py-3 px-6 font-medium">
                      {product.extras.map((extra) => (
                        <span key={extra.id}>{extra.name},</span>
                      ))}
                    </td>
                    <td className="md:py-4 py-3 px-6 font-medium">
                      {product.price}
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
        <div className="min-h-[calc(100vh_-_433px)] w-full md:w-auto  p-6 flex flex-col items-center justify-center bg-secondary text-white mt-3 md:mt-0">
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
          <button className="btn mt-5">CHECKOUT NOW</button>
        </div>
      </div>
    </div>
  );
}

export default index;
