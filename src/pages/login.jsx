import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        payload,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.data.email);
      localStorage.setItem("role", res.data.data.role);
      localStorage.setItem("img", res.data.data.profilePictureUrl);

      navigate("/");
    } catch (error) {
      setError(error.response ? error.response.data.message : "Network error");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup.string().required("Email harus diisi").email("Pastikan yang diinput adalah email"),
      password: yup.string().required("Password harus diisi").min(6, "Password minimal 6 karakter"),
    }),
    onSubmit: handleLogin,
  });
  
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex rounded-lg shadow-xl md:flex-row md:gap-4">
        <div className="flex flex-col justify-center p-6">
          <Link to="/">
            <img className="mx-auto w-[50px] h-[50px]" src="/trip.png" alt="" />
          </Link>
          <h1 className="text-3xl font-bold">Log in</h1>

          <p className="mt-4 text-sm">
            {" "}
            If you already a member, easily log in
          </p>

          {token && <p className="mt-4 text-sm"> Successfully login </p>}
          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col gap-3 mt-5"
          >
            <label htmlFor="email">Email</label>
            <input
              {...formik.getFieldProps("email")}
              type="email"
              name="email"
              id="email"
              placeholder="Input email"
              className="p-2 border border-orange-300 rounded-lg focus:outline-none"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-sm text-red-500">{formik.errors.email}</div>
            ) : null}

            <label htmlFor="password">Password</label>
            <div className="flex justify-between p-2 border border-orange-300 rounded-lg">
              <input
                {...formik.getFieldProps("password")}
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Input password"
                className="focus:outline-none"
              />
              <div onClick={() => setShowPassword(!showPassword)} className="cursor-pointer">
                {showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-sm text-red-500">{formik.errors.password}</div>
            ) : null}
            <button
              type="submit"
              className="p-2 mt-2 font-semibold bg-orange-300 rounded-lg hover:bg-orange-500"
            >
              Log In
            </button>
            <p className="text-center">
              Don't have an account yet?{" "}
              <Link className="text-orange-500" to="/register">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden w-[500px] md:block">
          <img src="/login.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
