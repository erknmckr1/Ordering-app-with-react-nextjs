import Title from "../../components/ui/Title";
import Input from "@/components/form/Input";
import { loginSchema } from "@/schema/login";
import { useFormik } from "formik";
import Link from "next/link";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { useSession, signIn, signOut } from "next-auth/react"
function login() {
  const { data: session } = useSession()
  const [loginValue, setLoginValue] = useState([]);
  //   const onSubmit = async ({ values, actions }) => {
  //     await new Promise((resolve) => setTimeout(resolve, 4000));
  //     console.log(values)
  //   };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
        setLoginValue(values);
      },
    });
  const inputs = [
    {
      id: 1,
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
    },
    {
      id: 2,
      name: "password",
      type: "text",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];
  return (
    <div className="container px-2 sm:mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  my-20 w-full md:w-1/2 mx-auto"
      >
        <Title addClass="text-[40px] text-center mb-6">Login</Title>
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
          <button type="submit" className="btn">LOGIN</button>
          <button onClick={() => signIn()} type="button" className="btn !bg-secondary flex justify-center items-center gap-x-3">
            {" "}
            <AiFillGithub /> GITHUB{" "}
          </button>
        </div>
        <Link href="/auth/register">
          <span className="text-start underline text-secondary py-2 text-sm">
            Do you no have a account?
          </span>
        </Link>
      </form>
    </div>
  );
}

export default login;
