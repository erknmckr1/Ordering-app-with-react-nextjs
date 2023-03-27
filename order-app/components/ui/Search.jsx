import Image from "next/image";
import {AiOutlineCloseCircle} from "react-icons/ai";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
function Search({ setİsSerchModal }) {
  return (
    // z index degerı ne kadar yüksek ise öge okadar yukarıda gorunur. Z ındex yalnız basına calısmaz positıon ozellıgı ıle bırlıkte kullanılmaıdır.
    <div className="fixed w-screen h-screen z-50 top-0 left-0 after:content-[''] after:w-screen after:h-screen after:bg-white-400 after:absolute after:top-0 after:left-0  grid place-content-center after:opacity-30 after:bg-purple-300">
      {/* click outside olayı  */}
      <OutsideClickHandler onOutsideClick={() => setİsSerchModal(false)}>
        {/* title component  */}
        <div className="w-full h-full grid place-content-start ">
          <div className="relative z-50 w-[600px] h-[400px] bg-white border-2 border-primary p-10 rounded-[20px]">
            {/* komponent className 'i yemedıgı ıcın classları props olarak yolladık. className'ide prop olarak atmayı denedık ama ısımler cakıstıgından olmadı. */}
            <Title addClass="text-[40px] text-center text-red-400  ">
              Title
            </Title>
            <input
              type="text"
              placeholder="Search..."
              className="text-center w-full border-2 mt-10 border-primary"
            />
            <ul className="mt-10">
              <li className="flex items-center justify-between py-3 px-10 mt-1 hover:bg-primary transition-all">
                <div>
                  <Image
                    className="rounded-full"
                    src="/FusilliRotini.jpeg"
                    alt="sss"
                    width={48}
                    height={60}
                  />
                </div>
                <span className="font-bold">Makarna</span>
                <span className="font-bold">$10</span>
              </li>
              <li className="flex items-center justify-between py-3 px-10 mt-1 hover:bg-primary transition-all">
                <div>
                  <Image
                    className="rounded-full"
                    src="/FusilliRotini.jpeg"
                    alt="sss"
                    width={48}
                    height={60}
                  />
                </div>
                <span className="font-bold">Makarna</span>
                <span className="font-bold">$10</span>
              </li>
              <li className="flex items-center justify-between py-3 px-10 mt-1 hover:bg-primary transition-all">
                <div>
                  <Image
                    className="rounded-full"
                    src="/FusilliRotini.jpeg"
                    alt="sss"
                    width={48}
                    height={60}
                  />
                </div>
                <span className="font-bold">Makarna</span>
                <span className="font-bold">$10</span>
              </li>
            </ul>
            <button onClick={()=>{setİsSerchModal(false)}} className="absolute right top-12">
              <AiOutlineCloseCircle className="absolute text-[30px] text-secondary hover:text-primary transition-all"  />
            </button>
          </div>
        </div>

        {/*  */}
      </OutsideClickHandler>
    </div>
  );
}

export default Search;
