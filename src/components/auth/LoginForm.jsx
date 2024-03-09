import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import InpField from "../common/InpField";
import axios from "axios";
import { toast } from "react-toastify";
import { useToken } from "../../hooks/useToken";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm();

  const { addLocal } = useToken();
  const navigate = useNavigate();

  const submitForm = async (formData) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/auth/login`,
        formData
      );

      if (response.status === 200) {
        const { user, token } = response.data;

        if (token) {
          const accessToken = token.accessToken;
          const refreshToken = token.refreshToken;

          addLocal({ user, accessToken, refreshToken });

          toast.success("Login Success");
          navigate("/");
        }
      }
    } catch (err) {
      setError("root.random", {
        type: "random",
        message: `User with ${formData.email} is not found!`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
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
        {`Don't have an account? `}
        <Link to="/register" className="text-indigo-600 hover:underline">
          Register
        </Link>
        {` Here`}
      </p>
    </form>
  );
};

export default LoginForm;
