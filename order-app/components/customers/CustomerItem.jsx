import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import axios from "axios";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-toastify";
function CustomerItem(comment) {
  const session = useSession();
  const [isHovered,setIsHovered] = useState(false)

 
  
  const handleMouseEnter = () => {
    if(comment.comment.email===session?.data?.user.email){
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleDeleteComment = async () => {
    if(session && comment.comment.email===session?.data?.user.email){
      try{
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/comments/${comment.comment._id}`)
        if(res.status===200){
          toast.success("Comment Deleted!")
        }
      }catch(err){
        console.log(err)
      }
    }
  }
  return (
    <div className="w-full p-3 " >
      <div className="bg-[#222831] p-6 rounded-md text-white relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <p>{comment?.comment.comment}</p>
        <p className="text-[20px] font-semibold mt-4">
          {comment?.comment.customer}
        </p>
        <p className="mt-2 text-[15px]">magna alique</p>
        <button onClick={handleDeleteComment} className={`text-primary ${isHovered ? "opacity-100" : "opacity-0"} absolute top-1 right-3`}>
          <DeleteIcon/>
        </button>
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
