import Input from "../form/Input"
import Title from "@/components/ui/Title";
import { useFormik } from "formik";
import { newPasswordSchema } from "@/schema/newPassword";
import axios from "axios";
import { toast } from "react-toastify";
function Password({user}) {
    const onSubmit = async (values, actions) => {
        try{
          const res = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/users/${user._id}`,values)
          toast.success("Updated!")
          console.log(values)
        }catch(err){
          console.log(err)
        }
      };
    
      const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
        useFormik({
          enableReinitialize: true,
          initialValues: {
            password:user?.password,
            confirmPassword:user?.confirmPassword
          },
          onSubmit,
          validationSchema: newPasswordSchema,
        });
    
      const inputs = [
        {
          id: 1,
          name: "password",
          type: "password",
          placeholder: "Password",
          value: values.password,
          errorMessage: errors.password,
          touched: touched.password,
        },
        {
          id: 2,
          name: "confirmPassword",
          type: "password",
          placeholder: "Confirm Password",
          value: values.confirmPassword,
          errorMessage: errors.confirmPassword,
          touched: touched.confirmPassword,
        },
        
      ];
  return (
    <form onSubmit={handleSubmit} className="p-4 w-full flex-1 relative ">
        <Title addClass="text-[40px]">Password</Title>
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {inputs.map((input)=>(
            <Input
            key={input.id}
            {...input}
            onChange={handleChange}
            onBlur={handleBlur} />
        ))}
        </div>
        <button type="submit" className="btn mt-4 text-white">Update</button>
      </form>
  )
}

export default Password