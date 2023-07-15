import Title from "../../components/ui/Title";
import Input from "@/components/form/Input";
import { loginSchema } from "@/schema/login";
import { useFormik } from "formik";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { signIn, getSession, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect } from "react";

function login() {
  const { push } = useRouter();
  const {data:session} = useSession();

  //! Request
  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try {
      const res = await signIn("credentials", options);
      if (res.status === 200) {
        toast.success("Signed in");
        actions.resetForm();
      } else {
        toast.warning("Username or password is wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  
   //! client sayfa yonlendırme 
   useEffect(()=>{
     const getUser = async ()=>{
       try{
         const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
         const user = res?.data.find((user)=>user.email === session?.user.email)
         push("/profile/"+ user._id)
       }catch(err){
         console.log(err)
       }
     }
     getUser();
   },[session])

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit,
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
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
    },
  ];
  return (
    <div className="container px-2 sm:mx-auto min-h-[calc(100vh_-_385px)]">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  justify-center py-20 h-full w-full md:w-1/2 mx-auto"
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
          <button type="submit" className="btn">
            LOGIN
          </button>
          <button
            onClick={() => signIn()}
            type="button"
            className="btn !bg-secondary flex justify-center items-center gap-x-3"
          >
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

//! client tarafı daha yuklenmeden sunucu tarafında ilgili yonlendırme ıslemlerı gerceklesıyor ve dırekt ılgılı sayfa ekrana gelıyor.

//* getServerSideProps ıle yaptıgımız ıslemler sayfa yuklendıgınde gerceklesır. Sayfa yuklendıkten sonra tekrar ıstek atmak ıstersek client kısmında yapmamız gerekiyor..

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  //! oturum yapan kullanıcının email'ini alıp veritabanı ıle karsılastırdık ve eşleşen kullanıcının ıd'sini query parametresi olarak yonlendırdık bu parametre ile profil sayfasında ılgılı kullanıcının bılgılerını gosterecegız.
   
  const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const user = res.data?.find((user) => user.email === session?.user.email);
  if (session && user) {
    return {
      redirect: {
        destination: "/profile/" + user._id,
        permanent: false,
      },
    };
  };
  return{
    props:{
      user:user ? user.data : null
    }
  }
};
