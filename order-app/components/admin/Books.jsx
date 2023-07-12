import React, { useEffect, useState } from 'react'
import Title from "../ui/Title";
import axios from "axios";
function Books() {
    const [books,setBooks] = useState([]);
   
    useEffect(()=>{
        const getBooks = async () => {
           try {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/booktable`)
            setBooks(res.data)
           } catch (err) {
            console.log(err);
           }
        }
        getBooks();
    },[])
  
  return (
    <div className=" lg:p-8 flex-1 lg:mt-0 mt-5 m-2 sm:m-0">
    <Title addClass="text-[40px]">Orders</Title>
    <div className="overflow-x-auto w-full mt-5  h-[500px] overflow-y-scroll">
      <table className="w-full text-sm text-center text-gray-500 min-w-[1000px]">
        <thead className="text-xs text-gray-400 uppercase bg-gray-700">
          <tr>
            <th scope="col" className="py-3 px-6">
              id
            </th>
            <th scope="col" className="py-3 px-6">
              CUSTOMER
            </th>
            <th scope="col" className="py-3 px-6">
              date
            </th>
            <th scope="col" className="py-3 px-6">
              persons
            </th>
           
            
          </tr>
        </thead>
        <tbody className="">
          {books.length > 0 &&
            books
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .map((book) => (
                <tr
                  key={book._id}
                  className="transition-all bg-secondary border-gray-700 hover:bg-primary "
                >
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    <span>{book?._id.substring(0,6)}...</span>
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {book?.fullName}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                    {book.date}
                  </td>
                  <td className="py-4 px-6 font-medium whitespace-nowrap hover:text-white">
                  {book.persons}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default Books