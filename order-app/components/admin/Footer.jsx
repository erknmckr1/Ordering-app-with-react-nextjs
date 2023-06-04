import Input from "../form/Input";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "@/schema/footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";
import {
  AiFillFacebook,
  AiOutlineTwitter,
  AiOutlineInstagram,
  AiFillLinkedin,
} from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { SiGmail } from "react-icons/si";
function Footer() {
  const [icon, setIcon] = useState("");
  const [linkList, setLinkList] = useState([]);
 
  const changeIcon = (e) => {
    setIcon(e.target.value);
  };

  const addLınk = () => {
   if(linkList.includes(icon)){
    return linkList;
   }else{
    setLinkList([...linkList,icon])
   }
  };

  
  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    actions.resetForm();
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        location: "",
        phoneNumber: "",
        email: "",
        time: "",
        desc: "",
        day: "",
      },
      onSubmit,
      validationSchema: footerSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "location",
      type: "text",
      placeholder: "Your Location",
      value: values.location,
      errorMessage: errors.location,
      touched: touched.location,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber,
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "time",
      type: "text",
      placeholder: "Local Time",
      value: values.time,
      errorMessage: errors.time,
      touched: touched.time,
    },
    {
      id: 5,
      name: "desc",
      type: "text",
      placeholder: "Description",
      value: values.desc,
      errorMessage: errors.desc,
      touched: touched.desc,
    },
    {
      id: 6,
      name: "day",
      type: "text",
      placeholder: "Day",
      value: values.day,
      errorMessage: errors.day,
      touched: touched.day,
    },
  ];
  return (
    <form className="p-4 w-full flex-1 flex-col relative">
      <Title addClass="text-[40px]">Footer</Title>
      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {inputs.map((input) => (
          <Input
            key={input.id}
            {...input}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        ))}
      </div>

      {/* lınk and ıcon side */}
      <div className="mt-2 flex justify-between flex-col lg:flex-row">
        <div className="flex gap-4 items-center">
          <Input placeholder="Link Address" value="https://" />
          <FormControl className="w-80">
            <InputLabel id="demo-simple-select-label">Icon</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={icon}
              label="Icon"
              onChange={changeIcon}
              className="border !border-primary !outline-none"
            >
              <MenuItem value={<AiFillFacebook />}>Facebook</MenuItem>
              <MenuItem value={<AiFillLinkedin />}>Linkedin</MenuItem>
              <MenuItem value={<AiOutlineInstagram />}>İnstagram</MenuItem>
              <MenuItem value={<AiOutlineTwitter />}>Twitter</MenuItem>
              <MenuItem value={<SiGmail />}>Gmail</MenuItem>
            </Select>
          </FormControl>
          <button onClick={addLınk} type="button" className="btn w-24 h-10">
            Add
          </button>
        </div>
        {linkList && (
          <ul className="flex items-center py-4">
            {linkList.map((item,index) => (
              <li key={index} className="flex  gap-1 px-1">
                <span className="text-[25px]">{item}</span>
                <button type="button" onClick={()=>setLinkList(prev=>prev.filter((item,i)=>i !== index))}  >
                  <BiTrash className="text-[10px] text-danger" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button className="btn mt-4">Update</button>
    </form>
  );
}

export default Footer;
