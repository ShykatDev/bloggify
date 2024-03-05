import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InpField from "../common/InpField";
import axios from "axios";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const navigate = useNavigate();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/register`,
        formData
      );

      if (response.status === 201) {
        toast.success("Account Created Successfully!");
        navigate("/login");
      }
    } catch (err) {
      setError("root.random", {
        type: "random",
        message: `User with ${formData.email} is already exist!`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <InpField label="First Name" error={errors.firstName}>
        <input
          {...register("firstName", { required: "First Name is required" })}
          type="text"
          name="firstName"
          id="firstName"
          className={`inp-field ${errors.email && "border-red-500"}`}
        />
      </InpField>

      <InpField label="Last Name" error={errors.lastName}>
        <input
          {...register("lastName", { required: "Last Name is required" })}
          type="text"
          name="lastName"
          id="lastName"
          className={`inp-field ${errors.email && "border-red-500"}`}
        />
      </InpField>
      <InpField label="Email" error={errors.email}>
        <input
          {...register("email", { required: "Email is required" })}
          type="email"
          name="email"
          id="email"
          className={`inp-field ${errors.email && "border-red-500"}`}
        />
      </InpField>

      <InpField label="Password" error={errors.password}>
        <input
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Your password should minimum 8 characters long",
            },
          })}
          type="password"
          name="password"
          id="password"
          className={`inp-field ${errors.email && "border-red-500"}`}
        />
      </InpField>

      <p className="text-red-500 block my-2">{errors?.root?.random?.message}</p>

      <div className="mb-6">
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
        >
          Login
        </button>
      </div>
      <p className="text-center">
        {`Already have an account? `}
        <Link to="/login" className="text-indigo-600 hover:underline">
          Login
        </Link>
        {` Here`}
      </p>
    </form>
  );
};

export default RegisterForm;
