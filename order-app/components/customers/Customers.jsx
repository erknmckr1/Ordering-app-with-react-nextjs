import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import CustomerItem from "./CustomerItem";
import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useSession } from "next-auth/react";
import Box from "@mui/joy/Box";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import Typography from "@mui/joy/Typography";
import { Button } from "@mui/material";
import Add from "@mui/icons-material/Add";
import axios from "axios";
import { toast } from "react-toastify";

function Customers({ userList }) {
  const session = useSession();
  //!
  const [comment, setComment] = useState("");
  const addEmoji = (emoji) => () => setComment(`${comment}${emoji}`);
  //!
  const [comments,setComments] = useState()
  const filteredUsers = userList.filter(
    (user) => user.email === session?.data?.user.email
  );
  
  //! get comment
  useEffect(()=>{
    const getComment = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/comments`)
        setComments(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getComment();
  },[])



  //! Create comment function
  const handleComment = async () => {
    const commentDetail ={
      customer:filteredUsers[0]?.fullName,
      image:filteredUsers[0]?.image,
      comment:comment
    }

    if(session){
      const res = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/comments`,commentDetail)
      if((await res).status === 200){
        toast.success("Comment Created!")
        setComment("")
      }
    }else{
      toast.error("Please login!")
    }
  };

  function NextBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 left-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white"
        onClick={onClick}
      >
        <IoIosArrowForward />
      </button>
    );
  }

  function PrevBtn({ onClick }) {
    return (
      <button
        className="absolute -bottom-12 right-1/2 bg-primary flex items-center justify-center w-10 h-10 rounded-full text-white mr-2"
        onClick={onClick}
      >
        <IoIosArrowBack />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: <PrevBtn />,
    nextArrow: <NextBtn />,
    responsive: [
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container mx-auto py-20">
      <Title addClass="text-[40px] text-center mb-12">
        What Says Our Customers
      </Title>
      <Slider {...settings}>     
        {comments && comments.map(comment=>{
        return  <CustomerItem key={comment._id} comment={comment}  />
        })} 
      </Slider>

      <div className="mt-16 flex flex-col sm:flex-row justify-between w-full items-center">
        <div className="w-screen px-3 sm:px-0">
          <Textarea
            placeholder="Type in here…"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            minRows={2}
            maxRows={4}
            startDecorator={
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  onClick={addEmoji("👍")}
                >
                  👍
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  onClick={addEmoji("😔")}
                >
                  😔
                </IconButton>
                <IconButton
                  variant="outlined"
                  color="neutral"
                  onClick={addEmoji("😍")}
                >
                  😍
                </IconButton>
              </Box>
            }
            endDecorator={
              <Typography level="body3" sx={{ ml: "auto" }}>
                {comment.length} character(s)
              </Typography>
            }
            sx={{ maxWidth: 800 }}
          />
        </div>

        <Button onClick={handleComment} className="text-white hover:text-primary font-semibold text-sm bg-primary mt-5 sm:mt-0 ml-5 lg:ml-0">
          {" "}
          <Add className="text-[30px]" /> Add to comment
        </Button>
      </div>
    </div>
  );
}

export default Customers;
