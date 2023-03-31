import { FaUser, FaShoppingCart, FaSearch } from "react-icons/fa";
import { useState } from "react";
import {AiOutlineCloseCircle} from "react-icons/ai";
import Search from "../ui/Search";
import Logo from "../ui/Logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { useRouter } from "next/router";
function Header() {
  // modal'ı acıp kapatacak state true ise modal ekrana gelecek.
  const [isSearcModal, setİsSerchModal] = useState(false);
  const [isBurgerModal,setİsBurgerModal]= useState(false)

  const router = useRouter()
  return (
    <header className={`h-[5.5rem] relative z-50 ${router.asPath === "/" ? "bg-transparent" :"bg-secondary"}`}>
      <div className="container flex justify-between mx-auto text-white items-center h-full">
        <Logo />
        <nav className={`sm:static h-screen sm:flex absolute top-0 left-0 grid place-content-center text-black sm:w-auto sm:h-auto w-full sm:bg-transparent sm:text-white  bg-white ${isBurgerModal !==true && 'hidden'}`}>
          <ul className="flex sm:flex-row flex-col gap-x-2 sm:text-[17px] text-[30px] font-bold ">
            <li className="px-[5px] py-[10px] hover:text-primary cursor-pointer ">
              <a className="font-dancing sm:font-sans" href="#">HOME</a>
            </li>
            <li className="px-[5px] py-[10px] hover:text-primary cursor-pointer">
              <a className="font-dancing sm:font-sans" href="#">MENU</a>
            </li>
            <li className="px-[5px] py-[10px] hover:text-primary cursor-pointer">
              <a className="font-dancing sm:font-sans" href="#">ABOUT</a>
            </li>
            <li className="px-[5px] py-[10px] hover:text-primary cursor-pointer">
              <a className="font-dancing sm:font-sans" href="#">BOOKTABLE</a>
            </li>
          </ul>
          <button onClick={()=>{setİsBurgerModal(false)}} className="absolute left-10  top-10 sm:hidden">
              <AiOutlineCloseCircle className="absolute text-[30px] text-secondary hover:text-primary transition-all"  />
            </button>
        </nav>
        <div className="flex gap-x-3 items-center ">
          <a href="#">
            <FaUser className="hover:text-primary transition-all" />
          </a>
          <a href="#">
            <FaShoppingCart className="hover:text-primary transition-all" />
          </a>
          <button onClick={() => setİsSerchModal(true)}>
            <FaSearch className="hover:text-primary transition-all" />
          </button>
          {/* md ve buyuk ekranlarda ınlıne-block aşağısında hıdden */}
          <a href="#" className="md:inline-block hidden">
            <button className="btn ">Order Online</button>
          </a>
          <button onClick={()=>{setİsBurgerModal(true)}} className="sm:hidden inline-block">
            <GiHamburgerMenu className="hover:text-primary transition-all text-l" />
          </button>
        </div>
      </div>
      {isSearcModal && <Search setİsSerchModal={setİsSerchModal} />}
    </header>
  );
}

export default Header;
