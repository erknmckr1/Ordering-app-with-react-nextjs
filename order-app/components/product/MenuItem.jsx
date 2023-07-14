import Image from "next/image";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addProduct } from "@/redux/cartSlice";
import { useDispatch } from "react-redux";
function MenuItem({ product }) {
  const { products } = useSelector((state) => state.cart);
  //! store dan product ları aldık ve menuıtem componentıne yolladıgımız productı aradık var ıse add cart butonunu dısabled yaptık.
  const cartItem = products.find((item) => item._id === product._id);

  const { title, prices, image, description, discount, discountPrice } =
    product;
  const dispatch = useDispatch();

  const handleProduct = () => {
    dispatch(
      addProduct({
        ...product,
        extras: [
          { item: "Ketchap", price: 3 },
          { item: "Mayonnaise", price: 3 },
        ],
        price: product.prices[0],
        quantity: 1,
      })
    );
  };
  return (
    <div className="bg-secondary flex flex-col items-center w-[300px] h-[440px] rounded-[25px]">
      <div className="w-full h-1/2 flex justify-center items-center bg-[#F2F3F4] rounded-bl-[40px]">
        <Link href={`product/${product._id}`}>
          <div className="relative !rounded-full overflow-hidden hover:scale-110 transition-all ">
            <Image
              src={image}
              alt=""
              width={400} 
              height={400} 
              style={{ width: "auto", height: "auto" }}
            />
          </div>
        </Link>
      </div>

      <div className="text-white w-full h-1/2 overflow-hidden flex flex-col justify-evenly items-start p-6">
        <h4 className="text-xl font-bold">{title}</h4>
        <p className="text-[13px]">{description}</p>
        <div className=" w-full flex  justify-between items-center ">
          <span className={`${discount > 0 ? "text-red-500" : "text-white"}`}>
            ${discount > 0 ? discountPrice : prices[0]}
          </span>
          <button
            disabled={cartItem}
            onClick={handleProduct}
            className="btn w-10 h-10 rounded-full !p-0 flex justify-center items-center "
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
