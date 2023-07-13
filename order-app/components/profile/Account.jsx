import Input from "../form/Input";
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import { profileSchema } from "../../schema/profile";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";

function Account({ user }) {
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState();
 
  const handleFileChange = (changeEvent) => {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setFile(changeEvent.target.files[0]);
    };

    //!Yüklenen dosyanın ıcerıgını base64 formatında vır verı olarak dondurduk.
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  //! Form submit function
  const onSubmit = async (values, actions) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ordering_photo"); //? klasor ısmıne bakılacak farklı bır klasor ısmı tanımlayınca olmuyor ?? 

    try {
      const uploadImg = await axios.post(
        "https://api.cloudinary.com/v1_1/dtar4nbiw/image/upload",
        data
      );
      const { url } = uploadImg.data;
      const updatedAccount = { ...values, image: url };
    
      const res = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,
        updatedAccount
      );
      if (res.status === 200) {
        toast.success("Account Updated");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        fullName: user?.fullName,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        address: user?.address,
        job: user?.job,
        bio: user?.bio,
      },
      onSubmit,
      validationSchema: profileSchema,
    });

  const inputs = [
    {
      id: 1,
      name: "fullName",
      type: "text",
      placeholder: "Your Full Name",
      value: values.fullName,
      errorMessage: errors.fullName,
      touched: touched.fullName,
    },
    {
      id: 2,
      name: "phoneNumber",
      type: "number",
      placeholder: "Your Phone Number",
      value: values.phoneNumber || "",
      errorMessage: errors.phoneNumber,
      touched: touched.phoneNumber,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      placeholder: "Your Email Address",
      value: values.email || "",
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 4,
      name: "job",
      type: "text",
      placeholder: "Your Job",
      value: values.job || "",
      errorMessage: errors.job,
      touched: touched.job,
    },
    {
      id: 5,
      name: "address",
      type: "text",
      placeholder: "Your Address",
      value: values.address || "",
      errorMessage: errors.address,
      touched: touched.address,
    },
    {
      id: 6,
      name: "bio",
      type: "text",
      placeholder: "Your Bio",
      value: values.bio || "",
      errorMessage: errors.bio,
      touched: touched.bio,
    },
  ];
  return (
    <form onSubmit={handleSubmit} className="p-4  w-full flex-1 relative ">
      <Title addClass="text-[40px]">Account Setting</Title>
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
            <img src={imageSrc} alt="" className="w-12 h-12 rounded-full" />
          </div>
        )}
      </label>
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
      <button type="submit" className="btn mt-4 text-white">
        Update
      </button>
    </form>
  );
}

export default Account;
