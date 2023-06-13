import { useFormik } from "formik";
import Input from "@/components/form/Input";
import Title from "@/components/ui/Title";
import { registerShema } from "@/schema/resgister";
import axios from "axios";
import { toast } from 'react-toastify';
function Register() {
  const onSubmit = async (values, actions) => {

    try {
      const res =  await axios.post(
        `http://localhost:3000/api/users/register`,
        values
      );
      if(res.status === 200){
        toast.success("User created successfully")
      }
      actions.resetForm();
    } catch (err) {
      toast.error(err.response.data.message)
      console.log(err);
      actions.resetForm();
    }
  };
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
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: registerShema,
    onSubmit,
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
      name: "email",
      type: "text",
      placeholder: "Your Email",
      value: values.email,
      errorMessage: errors.email,
      touched: touched.email,
      autoComplete: "email",
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Your Password",
      value: values.password,
      errorMessage: errors.password,
      touched: touched.password,
      autoComplete: "new-password",
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Your Confirm Email",
      value: values.confirmPassword,
      errorMessage: errors.confirmPassword,
      touched: touched.confirmPassword,
      autoComplete: "new-password",
    },
  ];
  return (
    <div className="container mx-auto">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full md:w-1/2 mx-auto my-20"
      >
        <Title addClass="text-[40px] text-center mb-6">Register</Title>
        <div className="flex flex-col w-full gap-y-2">
          {inputs.map((input) => (
            <Input
              key={input.id}
              {...input}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          ))}
        </div>
        <div className="w-full mt-6 flex flex-col">
          <button type="submit" className="btn">
            REGISTER
          </button>
        </div>
        <span className="underline text-secondary py-2 text-sm">
          Do you have a account?
        </span>
      </form>
    </div>
  );
}

export default Register;
