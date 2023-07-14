import React from "react";
import Image from "next/image";
function CustomerItem(comment) {
  return (
    <div className="w-full p-3">
      <div className="bg-[#222831] p-6 rounded-md text-white">
        <p>{comment?.comment.comment}</p>
        <p className="text-[20px] font-semibold mt-4">
          {comment?.comment.customer}
        </p>
        <p className="mt-2 text-[15px]">magna alique</p>
      </div>
      <div
        className="relative w-28 h-28 border-4 border-primary rounded-full mt-8 before:content-[''] before:absolute before:top-0 
      flex justify-center before:-translate-y-3 before:rotate-45 before:bg-primary before:w-5 before:h-5 "
      >
        <Image
          className="rounded-full"
          fill={true}
            object-fit="cover"
          src={comment?.comment.image}
          alt=""
        />
      </div>
    </div>
  );
}

export default CustomerItem;
