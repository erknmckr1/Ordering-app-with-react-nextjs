import Input from "../form/Input";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import { footerSchema } from "@/schema/footer";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BiTrash } from "react-icons/bi";
import axios from "axios";
import { toast } from "react-toastify";
import { library } from "@fortawesome/fontawesome-svg-core";
import {fab} from '@fortawesome/free-brands-svg-icons'
function Footer() {
  library.add(fab);
  const [footer, setFooter] = useState([]);

  const addLınk = () => {
    const { li, ic } = values;
    const newLink = { icon: ic, link: li };
    console.log(newLink);
    if (
      values.links &&
      values.links.some((item) => item.link === li && item.icon === ic)
    ) {
      // Link ve ikon zaten var, işlem yapma
      return;
    } else {
      values.links = [...values.links, newLink];
      values.ic = "";
      values.li = "";
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        location: "",
        phoneNumber: "",
        email: "",
        time: [{ hour: "", days: "" }],
        desc: "",
        li: "https://",
        ic: "",
        links: [],
      },

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
      name: "time[0].hour",
      type: "text",
      placeholder: "Local Time",
      value: values.time[0].hour,
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
      name: "time[0].days",
      type: "text",
      placeholder: "Day",
      value: values.time[0].days,
      errorMessage: errors.day,
      touched: touched.day,
    },
  ];
  const lınkIcons = [
    { value: ["fab", "facebook"], name: "Facebook" },
    { value: ["fab", "linkedin"], name: "Linkedin" },
    { value: ["fab", "instagram"], name: "Instagram" },
    { value: ["fab", "twitter"], name: "Twitter" },
    { value: ["fas", "envelope"], name: "Gmail" },
  ];

  useEffect(() => {
    const getFooter = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/footer`
        );
        setFooter(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFooter();
  }, []);

  const createdFooter = async () => {
    const { location, phoneNumber, email, time, desc, links } = values;

    const footerInfo = {
      location: location,
      phoneNumber: phoneNumber,
      email: email,
      time: time,
      desc: desc,
      links: links,
    };

    console.log(links);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/footer`,
        footerInfo
      );

      if (res.status === 200) {
        toast.success("Footer Created!");
      }
    } catch (err) {
      console.log(err);
    }
  };
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
          <Input onChange={handleChange} name="li" value={values.li} />
          <FormControl className="w-80">
            <InputLabel id="demo-simple-select-label">Icon</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              value={values.ic}
              name="ic"
              label="Icon"
              onChange={handleChange}
              className="border !border-primary !outline-none"
            >
              {lınkIcons.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <button onClick={addLınk} type="button" className="btn w-24 h-10">
            Add
          </button>
        </div>
        {values.links && (
          <ul className="flex items-center py-4">
            {values?.links.map((item, index) => (
              <li key={index} className="flex  gap-1 px-1">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={`${item.icon[0]},${item.icon[1]}`} />
                </a>

                <button type="button">
                  <BiTrash className="text-[10px] text-danger" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button onClick={createdFooter} type="button" className="btn mt-4">
        Update
      </button>
    </form>
  );
}

export default Footer;
