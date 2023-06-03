import React, { useState } from "react";
import Title from "../ui/Title";
import Input from "../form/Input";

function Category() {
  const [categoryInput, setCategoryInput] = useState("");
  const [categories, setCategories] = useState([
    "Pizza",
    "Cake",
    "Drinks",
    "asd",
    "asdasd",
  ]);
  const inputs = {
    id: 1,
    name: "category",
    type: "text",
    placeholder: "Add a New Category...",
    value: categoryInput,
  };

  const handleChange = (e) => {
    setCategoryInput(e.target.value);
  };
  const handleDelete = (category) => {
    setCategories(categories.filter((item) => item !== category));
  };
  return (
    <div className=" max-h-[calc(100vh_-_433px)] p-2 lg:p-8 flex-1 lg:mt-0 mt-5 overflow-y-scroll">
      <Title addClass="text-[40px]">Categories</Title>
      <div className="mt-5">
        {/* add category side start */}
        <div className="flex gap-x-10 items-center">
          <Input onChange={handleChange} {...inputs} />
          <button
            onClick={() => (setCategories([...categories, categoryInput]),setCategoryInput(""))}
            className="btn"
          >
            Add
          </button>
        </div>
        {/* add category side end */}
        <div className="  mt-3 bg-secondary text-white  ">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-4 border-b hover:bg-primary px-2"
            >
              <span>{category}</span>
              <button
                onClick={() => handleDelete(category)}
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
