import React, { useEffect, useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { useFormik } from "formik";
import axios from "axios";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";
function AddCategory({ setIsAddOpen }) {
  const [file, setFile] = useState();
  const [imageSrc, setImageSrc] = useState();
  const [categories, setCategories] = useState();
  const {
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: {
      title: "",
      description: "",
      category: "Hamburger",
      prices: [0,0,0],
      item: "",
      price: 0,
      extras: [],
    },
    //onSubmit: (values) => {alert(JSON.stringify(values,null,2))},
  });

  //! FileReader
  const handleFileChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    //!Yüklenen dosyanın ıcerıgını base64 formatında vır verı olarak dondurduk.
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  //!FormData, Create Product Function
  const createImage = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ordering_photo");

    try {
      const uploadImg = await axios.post(
        "https://api.cloudinary.com/v1_1/dtar4nbiw/image/upload",
        data
      );
      const { url } = uploadImg.data;

      const productInfo = {
        title: values.title,
        description: values.description,
        category: values.category,
        extras: values.extras,
        prices: values.prices,
        image: url,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/product`,
        productInfo
      );

      if (res.status === 200) {
        toast.success("Product already created!");
        setImageSrc("");
        setFile("");
        resetForm();
        setIsAddOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  //! Add Extra
  const handleAddExtra = () => {
    const { item, price } = values;
    const newExtra = { item: item, price: price };
    if (values.extras && !values.extras.some((extra) => extra.item === item)) {
      values.extras = [...values.extras, newExtra];
      values.item = "";
      values.price = "";
    }
  };
  //! Extra delete function
  const handleDeleteExtra = (index) => {
    const filteredExtra = values.extras.filter((_, i) => index !== i);
    setFieldValue("extras", filteredExtra);
  };

  //! Get categories from db

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/category`
        );
        setCategories(res.data.message);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  return (
    <div className="fixed w-screen h-screen z-50 top-0 left-0 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0  grid place-content-center after:opacity-30 overflow-auto ">
      <OutsideClickHandler onOutsideClick={() => setIsAddOpen(false)}>
        <div className="grid place-content-start w-full h-full">
          <form
            onSubmit={handleSubmit}
            className="relative z-50 rounded-[20px] md:w-[600px] w-[370px] h-[auto] bg-white border-primary border-2 p-8"
          >
            <Title
              addClass={
                "text-center text-[30px] underline tracking-widest underline-offset-4 text-red-400"
              }
            >
              Add New Product
            </Title>
            <div className="flex flex-col text-sm mt-6">
              <label className="flex gap-2 items-center">
                <input
                  type="file"
                  onChange={(e) => handleFileChange(e)}
                  className="hidden"
                />
                <button className="btn !rounded-none !bg-blue-600 pointer-events-none">
                  Choose an Image
                </button>
                {imageSrc && (
                  <div>
                    {/*eslint-disable-next-line @next/next/no-img-element*/}
                    <img
                      src={imageSrc}
                      alt=""
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                )}
              </label>
            </div>
            <div className="flex flex-col p-2">
              <span className="font-bold">Title</span>
              <input
                type="text"
                className="border p-1 outline-none"
                placeholder="Write a title..."
                name="title"
                value={values.title}
                onChange={handleChange}
                id="title"
              />
            </div>
            <div className="flex flex-col p-2">
              <span className="font-bold">Description</span>
              <textarea
                className="border p-1 outline-none"
                placeholder="Write a description..."
                name="description"
                value={values.description}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col p-2">
              <span className="font-bold">Select Category</span>
              <select
                className="border outline-none p-1"
                name="category"
                value={values.category}
                onChange={handleChange}
                id=""
              >
                {categories &&
                  categories.map((item) => (
                    <option key={item._id} value={item.title.toLowerCase()}>
                      {item.title}
                    </option>
                  ))}
              </select>
            </div>
            <div className="flex flex-col p-2">
              <span className="font-bold">Prices</span>

              <div className="flex justify-between flex-col sm:flex-row">
                <input
                  className="p-1 border-b outline-none"
                  type="number"
                  placeholder="Small"
                  name="prices[0]"
                  value={values.prices[0]}
                  onChange={handleChange}
                />
                <input
                  className="p-1 border-b outline-none"
                  type="number"
                  placeholder="Medium"
                  name="prices[1]"
                  value={values.prices[1]}
                  onChange={handleChange}
                />
                <input
                  className="p-1 border-b outline-none"
                  type="number"
                  placeholder="Large"
                  name="prices[2]"
                  onChange={handleChange}
                  value={values.prices[2]}
                />
              </div>

              <div></div>
            </div>
            <div className="flex flex-col p-2">
              <span className="font-bold">Extras</span>
              <div className="flex justify-between flex-col gap-1 sm:flex-row">
                <input
                  className="p-1 border-b outline-none"
                  type="text"
                  placeholder="İtem"
                  name="item"
                  value={values.item}
                  onChange={handleChange}
                />
                <input
                  className="p-1 border-b outline-none"
                  type="text"
                  placeholder="Price"
                  name="price"
                  value={values.price}
                  onChange={handleChange}
                />
                <button onClick={handleAddExtra} className="btn ">
                  Add
                </button>
              </div>
              <div className="flex gap-2">
                {values.extras &&
                  values.extras.map((item, index) => (
                    <div
                      className=" relative w-20 h-10  p-1 rounded-2xl text-orange-400 border-orange-400 text-center border mt-3"
                      key={index}
                    >
                      <span className="flex justify-start h-full items-center ">
                        {item.item}
                      </span>
                      <AiOutlineCloseCircle
                        onClick={() => handleDeleteExtra(index)}
                        className="absolute top-0 right-1 hover:text-black cursor-pointer transition-all "
                      />
                    </div>
                  ))}
              </div>
            </div>
            <div className=" flex justify-end ">
              <button
                onClick={createImage}
                type="submit"
                className=" border btn rounded-2xl p-1 !bg-green-400 "
                onSubmit={handleSubmit}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export default AddCategory;
