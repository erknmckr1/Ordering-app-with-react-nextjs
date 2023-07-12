import Title from "../../components/ui/Title";
import Input from "@/components/form/Input";
import { adminSchema } from "@/schema/admin";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';

function admin() {
  const {push} = useRouter(); 

  const onSubmit = async (values,actions) => {
   try{
    const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin`,values)
    if(res.status===200){
      toast.success("Admin Login Success!")
      push("/admin/profile")
    }
   }catch(err){
    console.log(err)
   }
  }

  const { values, errors, touched, handleSubmit, handleChange, handleBlur,resetForm } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      validationSchema: adminSchema,
      onSubmit
    });
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Your username",
      value: values.username,
      errorMessage: errors.username,
      touched: touched.username,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];
  return (
    <div className="container mx-auto py-8 sm:h-[calc(100vh_-_385px)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  my-20 w-full md:w-1/2 mx-auto"
      >
        <Title addClass="text-[40px] text-center mb-6">Login Admin Page</Title>
        <div className="flex flex-col w-full  gap-y-3">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="flex flex-col w-full mt-6 gap-y-3 text-white">
          <button className="btn">LOGIN</button>
        </div>
        <Link href="/">
          <span className="text-start underline text-secondary py-2 text-sm">
            Home Page
          </span>
        </Link>
      </form>
    </div>
  );
}

export default admin;

export async function getServerSideProps(context){
  const cookies = context.req.cookies
  if(cookies.token === process.env.ADMIN_TOKEN){
    return{
      redirect:{
        destination:"/admin/profile",
        parmanent:false,
      }
    }
  }
  return{
    props:{}
  }
}