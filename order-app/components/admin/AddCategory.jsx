import React, { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import Title from "../ui/Title";
import { useFormik } from 'formik';

function AddCategory({setIsAddOpen}) {
    const [file, setFile] = useState();
    const [imageSrc, setImageSrc] = useState();
    const {handleSubmit,handleChange,handleBlur,values} = useFormik({
        initialValues:{
            title:"",
            description:"",
            category:"",
            small:"",
            medium:"",
            large:"",
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
          },
    })

    const handleFileChange = (changeEvent) => {
        const reader = new FileReader();
    
        reader.onload = function (onLoadEvent) {
          setImageSrc(onLoadEvent.target.result);
          setFile(changeEvent.target.files[0]);
        };
    
        reader.readAsDataURL(changeEvent.target.files[0]);
        console.log(imageSrc);
      };
    
  return (
    <div className="fixed w-screen h-screen z-50 top-0 left-0 after:content-[''] after:w-screen after:h-screen after:bg-white after:absolute after:top-0 after:left-0  grid place-content-center after:opacity-30 overflow-auto ">
      <OutsideClickHandler onOutsideClick={()=>setIsAddOpen(false)}>
        <div className="grid place-content-start w-full h-full">
            <form onSubmit={handleSubmit} className="relative z-50 rounded-[20px] md:w-[600px] w-[370px] h-[auto] bg-white border-primary border-2 p-8">
                <Title addClass={"text-center text-[30px] underline tracking-widest underline-offset-4 text-red-400"}>Add New Product</Title>
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
                    <input type="text" className="border p-1 outline-none" placeholder="Write a title..." name="title" value={values.title} onChange={handleChange}  id="title"  />
                </div>
                <div className="flex flex-col p-2">
                    <span className="font-bold">Description</span>
                    <textarea className="border p-1 outline-none" placeholder="Write a title..." name="description" value={values.description} onChange={handleChange} />
                </div>
                <div className="flex flex-col p-2">
                    <span className="font-bold">Select Category</span>
                   <select className="border outline-none p-1" name="category" value={values.category} onChange={handleChange} id="">
                    <option value="1">Category 1</option>
                    <option value="2">Category 2</option>
                    <option value="3">Category 3</option>
                    <option value="4">Category 4</option>
                   </select>
                </div>
                <div className="flex flex-col p-2">
                    <span className="font-bold">Prices</span>
                    <div className="flex justify-between flex-col sm:flex-row">
                        <input className="p-1 border-b outline-none" type="text" placeholder="Small" name="small" value={values.small} onChange={handleChange} />
                        <input className="p-1 border-b outline-none" type="text" placeholder="Medium" name="medium" value={values.medium} onChange={handleChange} />
                        <input className="p-1 border-b outline-none" type="text" placeholder="Large" name="large" onChange={handleChange} value={values.large} />
                    </div>
                </div>
                <div className="flex flex-col p-2">
                    <span className="font-bold">Extras</span>
                    <div className="flex justify-between flex-col gap-1 sm:flex-row">
                        <input className="p-1 border-b outline-none" type="text" placeholder="İtem" />
                        <input className="p-1 border-b outline-none" type="text" placeholder="Price" />
                        <button className="btn ">Add</button>
                    </div>
                    <span className="w-20 p-1 rounded-2xl text-orange-400 border-orange-400 text-center border mt-3">ketchap</span>
                </div>
                <div className=" flex justify-end ">
                <button type="submit" className=" border btn rounded-2xl p-1 !bg-green-400 ">Create</button>
                </div>
               
            </form>
        </div>
      </OutsideClickHandler>
    </div>
  );
}

export default AddCategory;
