import React, { useEffect, useState } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";
import axios from "axios";
import { toast } from "react-toastify";
function Category() {
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([]);
  const inputs = {
    id: 1,
    name: "category",
    type: "text",
    placeholder: "Add a New Category...",
    value: categoryInput,
  };
 
  //! get categories
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

  //! post category
  const addCategory = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/category`,{title:categoryInput}
      );
      if (res.status === 200) {
        toast.success("Category created");
        setCategoryInput("");
      } else {
        toast.warning("There is a category with the same name");
        setCategoryInput("");
      }
    } catch (err) {
      console.log(err);
    }
  };

  //! Kategori silme işlemi 
  const deleteCategory = async (id) =>{
    try{
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${id}
      `)
      if(res.status===200){
        setCategories(categories.filter((category)=>{category.id !== id}))
        toast.success("Deleted completed!")
      }else{
        toast.warning("Please repeat again!")
      }
    }catch(err){
      
      console.log(err)
    }
  }
  const handleChange = (e) => {
    setCategoryInput(e.target.value);
  };

  return (
    <div className="  p-2 flex-1 lg:mt-0 mt-5 overflow-y-scroll">
      <Title addClass="text-[40px]">Categories</Title>
      <div className="mt-5 ">
        {/* add category side start */}
        <div className="flex gap-x-10 items-center">
          <Input onChange={handleChange} {...inputs} />
          <button onClick={addCategory} className="btn">
            Add
          </button>
        </div>
        {/* add category side end */}
        <div className="  mt-3 bg-secondary text-white max-h-[450px] overflow-auto  ">
          {categories &&
            categories.map((category, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 border-b hover:bg-primary px-2"
              >
                <span>{category.title}</span>
                <button
                  onClick={() => deleteCategory(category._id)}
                  className="btn !bg-danger"
                >
                  Delete
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
