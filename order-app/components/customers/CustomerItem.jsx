import React from 'react'
import Image from 'next/image'
function CustomerItem() {
  return (
    <div className='w-full p-3'>
      <div className='bg-[#222831] p-6 rounded-md text-white' >
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Assumenda delectus sapiente porro dolor quis nobis enim, corporis error cum quod!</p>
        <p className='text-[20px] font-semibold mt-4'>Mike Hamell</p>
        <p className='mt-2 text-[15px]'>magna alique</p>
      </div>
      <div
        className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
      flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5 "
      >
        <Image className='rounded-full'  layout="fill"
          objectFit="contain" src="/me.jpg" alt=''/>
      </div>
    </div>
  )
}

export default CustomerItem