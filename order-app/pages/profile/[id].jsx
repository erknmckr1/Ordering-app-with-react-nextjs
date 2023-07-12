import Image from "next/image";
import { AiFillHome, AiFillCloseCircle } from "react-icons/ai";
import { BsFillKeyFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { GiDutchBike } from "react-icons/gi";
import { BiExit } from "react-icons/bi";
import { useEffect, useState } from "react";
import Account from "@/components/profile/Account";
import Password from "@/components/profile/Password";
import Order from "@/components/profile/Order";
import { signOut,getSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from "axios";

function Profile({user}) {
  const { push } = useRouter();

  const handleSıgnOut = () => {
    if (confirm("Are you sure you want to log out?")) {
      signOut({ redirect: false });
      push("/auth/login");
    }
  };

  const [close, SetClose] = useState(false);
  const [tab, setTab] = useState(0);

  const handleClose = () => {
    SetClose(true);
  };
  const handleOpen = () => {
    SetClose(false);
  };

  
  
  return (
    //! buraya donus yapılacak acılır kapanır panel olarak ayarlanacak...
    <div className="lg:px-10 min-h-[calc(100vh_-_385px)] flex lg:items-center md:flex-row flex-col relative">
      <div
        className={`sm:w-80 w-60 absolute lg:static ${
          close ? "-translate-x-[360px] " : ""
        } z-40 h-full sm:h-[calc(100vh_-_385px)] flex flex-col justify-center  transition-all duration-[1500ms] bg-white border-2  lg:border-1  `}
      >
        <div className="flex  flex-col items-center py-8 sm:border-b-2">
          <Image
            className="rounded-full"
            alt=""
            src="/me.jpg"
            width={100}
            height={100}
          />
          <span className="text-center py-2 font-bold text-[20px]">
            {user && user.fullName}
          </span>
        </div>
        <div>
          <ul className="font-semibold">
            <li
              onClick={() => setTab(0)}
              className={` ${
                tab === 0 && "bg-primary text-white"
              } flex items-center py-2 px-2 hover:bg-primary hover:text-white border-b-2`}
            >
              <AiFillHome />
              <button className="pl-1">Account</button>
            </li>
            <li
              onClick={() => setTab(1)}
              className={` ${
                tab === 1 && "bg-primary text-white"
              } flex items-center py-2 px-2 hover:bg-primary hover:text-white border-b-2`}
            >
              <BsFillKeyFill />
              <button className="pl-1">Password</button>
            </li>
            <li
              onClick={() => setTab(2)}
              className={` ${
                tab === 2 && "bg-primary text-white"
              } flex items-center py-2 px-2 hover:bg-primary hover:text-white border-b-2`}
            >
              <GiDutchBike />
              <button className="pl-1">Orders</button>
            </li>
            <li className="flex items-center py-2 px-2 hover:bg-primary hover:text-white border-b-2">
              <BiExit />
              <button onClick={handleSıgnOut} className="pl-1">
                Exit
              </button>
            </li>
          </ul>
        </div>
        <button onClick={handleClose}>
          <AiFillCloseCircle className=" lg:hidden absolute z-40 top-2 right-2 text-[20px] bg-white text-secondary" />
        </button>
      </div>

      {/*right side start tab state'inin degerine gore görüntülenecek. Her deger ilgili komponenti tutuyor.*/}
      {tab === 0 && <Account user={user} />}
      {tab === 1 && <Password user={user} />}
      {tab === 2 && <Order user={user} />}
      <button
        onClick={handleOpen}
        className={`${
          close ? "block" : "hidden"
        } lg:hidden absolute top-2 -left-2 text-[20px] drop-shadow-2xl`}
      >
        <BsFillArrowRightCircleFill />
      </button>
    </div>
  );
}

export default Profile;


//! asagıdakı ıslemı client tarafında yaptıgım zaman once profile sayfasına gıdıp daha sonra login sayfasına gıdıyordu getServerSideProps metodu sayesınde işlemi sunucu tarafına yapıp yonlendırıyoruz. getServerSideProps fonksıyonu sayfada her ıstek oldugunda calısacak.

export const getServerSideProps = async ({ req, params }) => {
  //! oturum bılgılerını aldık
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  //!oturum bılgısı mevcutsa 
  const user = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`
  );
  return {
    props: {
      session:session.user,
      user:user ? user.data.user : null
    },
  };
};
