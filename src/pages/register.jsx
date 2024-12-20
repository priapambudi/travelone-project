import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Validation schema using Yup
  const validationSchema = yup.object({
    email: yup
      .string()
      .required("Email harus diisi")
      .email("Pastikan yang diinput adalah email"),
    name: yup.string().required("Nama harus diisi"),
    password: yup
      .string()
      .required("Password harus diisi")
      .min(6, "Password minimal 6 karakter"),
    passwordRepeat: yup
      .string()
      .required("Repeat password harus diisi")
      .oneOf([yup.ref("password"), null], "Password harus sama"),
    phone: yup.string().required("Phone harus diisi"),
  });

  // formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
      passwordRepeat: "",
      role: "user",
      phone: "",
      profilePicture: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("image", values.profilePicture);

      try {
        // Upload profile picture first
        const res = await axios.post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/upload-image",
          formData,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "multipart/form-data",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiI5NWE4MDNjMy1iNTFlLTQ3YTAtOTBkYi0yYzJmM2Y0ODE1YTkiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2Nzk4NDM0NDR9.ETsN6dCiC7isPReiQyHCQxya7wzj05wz5zruiFXLx0k",
            },
          }
        );

        const profilePictureUrl = res.data.url;

        // Register user with uploaded picture URL
        const payload = { ...values, role: "user", profilePictureUrl };
        delete payload.profilePicture;

        await axios.post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
          payload,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              "Content-Type": "application/json",
            },
          }
        );

        setSuccessMessage("Registration successful");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        setError(error.response?.data?.message || "Registration failed");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <div className="flex rounded-lg shadow-xl md:flex-row md:gap-4">
        <div className="flex flex-col justify-center p-6">
          <Link to="/">
            <img className="mx-auto w-[50px] h-[50px]" src="/trip.png" alt="" />
          </Link>
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <p className="my-3 text-sm">Please enter your details</p>
          {error && <p className="text-red-600 ">{error}</p>}

          {successMessage && (
            <p className="text-green-600 ">{successMessage}</p>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className="flex flex-col space-y-4"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-sm font-medium">
                  Email
                </label>
                <input
                  {...formik.getFieldProps("email")}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="p-2 border border-orange-300 rounded-lg focus:outline-none "
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 text-sm font-medium">
                  Name
                </label>
                <input
                  {...formik.getFieldProps("name")}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  className="p-2 border border-orange-300 rounded-lg focus:outline-none"
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 text-sm font-medium">
                  Password
                </label>
                <div className="flex justify-between p-2 border border-orange-300 rounded-lg">
                  <input
                    {...formik.getFieldProps("password")}
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Password"
                    className="w-full focus:outline-none"
                  />
                  <div
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <VisibilityOffIcon sx={{ fontSize: 20 }} />
                    )}
                  </div>
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-xs text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="passwordRepeat"
                  className="mb-1 text-sm font-medium"
                >
                  Password Repeat
                </label>
                <div className="flex justify-between p-2 border border-orange-300 rounded-lg">
                  <input
                    {...formik.getFieldProps("passwordRepeat")}
                    type={showPasswordRepeat ? "text" : "password"}
                    name="passwordRepeat"
                    id="passwordRepeat"
                    placeholder="Repeat Password"
                    className="w-full focus:outline-none"
                  />
                  <div
                    onClick={() => setShowPasswordRepeat(!showPasswordRepeat)}
                    className="cursor-pointer"
                  >
                    {showPasswordRepeat ? (
                      <VisibilityIcon sx={{ fontSize: 20 }} />
                    ) : (
                      <VisibilityOffIcon sx={{ fontSize: 20 }} />
                    )}
                  </div>
                </div>
                {formik.touched.passwordRepeat &&
                formik.errors.passwordRepeat ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.passwordRepeat}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <div className="flex flex-col">
                <label
                  htmlFor="profilePicture"
                  className="mb-1 text-sm font-medium"
                >
                  Upload Img
                </label>
                <input
                  onChange={(event) =>
                    formik.setFieldValue(
                      "profilePicture",
                      event.target.files[0]
                    )
                  }
                  type="file"
                  name="profilePicture"
                  id="profilePicture"
                  className="p-2 border border-orange-300 rounded-lg "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="mb-1 text-sm font-medium">
                  Phone
                </label>
                <input
                  {...formik.getFieldProps("phoneNumber")}
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Phone"
                  className="p-2 border border-orange-300 rounded-lg focus:outline-none"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <div className="text-xs text-red-500">
                    {formik.errors.phoneNumber}
                  </div>
                ) : null}
              </div>
            </div>
            <button
              type="submit"
              className="p-2 bg-orange-300 rounded-lg hover:bg-orange-500 bg-"
            >
              Sign Up
            </button>
            <p className="text-center">
              Already have an account?{" "}
              <Link className="text-orange-500" to="/login">
                Log In
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden w-[500px] h-full my-auto md:block">
          <img src="/register.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
