import Title from "../../components/ui/Title";
import Input from "@/components/form/Input";
import { loginSchema } from "@/schema/login";
import { useFormik } from "formik";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { useSession, signIn,getSession } from "next-auth/react"
import {toast} from "react-toastify"
import { useRouter } from "next/router";
function login() {
  const { data: session } = useSession();
  const {push} = useRouter();

  // Request
  const onSubmit = async (values, actions) => {
    const { email, password } = values;
    let options = { redirect: false, email, password };
    try{
      const res = await signIn("credentials", options);
      if(res.status===200){
        toast.success("Signed in")
        push("/profile")
        actions.resetForm();
      }else{
        toast.warning("Username or password is wrong!")
      }
    }catch(err){
      console.log(err)
    }
  };

  // oturum var ise login sayfasından profile sayfasına yonlendır... 
  // useEffect(()=>{
  //   if(session){
  //     setTimeout(()=>{
  //       push("/profile")
  //     })
  //   }
  // },[session])
  

  const { values, errors, touched, handleSubmit, handleChange, handleBlur,resetForm } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: loginSchema, 
      onSubmit
    });
    console.log(session)
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


// client tarafı daha yuklenmeden sunucu tarafında ilgili yonlendırme ıslemlerı gerceklesıyor ve dırekt ılgılı sayfa ekrana gelıyor.
export const getServerSideProps = async ({req}) =>{
  const session = await getSession({req})
    if(session){
      return{
        redirect:{
          destination:"/profile",
          permanent:false
        }
      }
    }
  return{
    props:{}
  }
  
}