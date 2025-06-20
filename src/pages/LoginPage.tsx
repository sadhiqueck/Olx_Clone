import React, {useEffect, useState } from "react";
import { X, AlertCircle } from "lucide-react";
import Logo from '../assets/olx_logo.svg'
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { UserAuth } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/FirebaseServices";


const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

const {user, login } = UserAuth();

  const [isLogin, setIsLogin] = useState(location.pathname === "/login");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState({
    usernameErr: "",
    emailErr: "",
    passwordErr: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user,navigate]);

  useEffect(() => {
    navigate(isLogin ? "/login" : "/register", { replace: true });
  }, [isLogin, navigate]);

  const validation = (type: string, value: string) => {
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_]{2,14}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (isLogin && type === "username") return;

    switch (type) {
      case "username":
        if (!value.trim().length) {
          setErrMsg({ ...errMsg, usernameErr: "Please enter a username" });
        } else if (value.trim().length < 3) {
          setErrMsg({
            ...errMsg,
            usernameErr: "Username must be at least 3 characters long",
          });
        } else if (!usernameRegex.test(value)) {
          setErrMsg({
            ...errMsg,
            usernameErr:
              "Username can only contain letters, numbers, and underscores, and must start with a letter.",
          });
        } else {
          setErrMsg({ ...errMsg, usernameErr: "" });
        }
        break;

      case "email":
        if (!value.trim().length) {
          setErrMsg({ ...errMsg, emailErr: "Please enter your email" });
        } else if (!emailRegex.test(value)) {
          setErrMsg({
            ...errMsg,
            emailErr: "Please enter a valid email address",
          });
        } else {
          setErrMsg({ ...errMsg, emailErr: "" });
        }
        break;

      case "password":
        if (value.trim().length === 0) {
          setErrMsg({ ...errMsg, passwordErr: "Please enter your password" });
        } else if (value.length < 6) {
          setErrMsg({
            ...errMsg,
            passwordErr: "Password must be at least 6 characters long",
          });
        } else {
          setErrMsg({ ...errMsg, passwordErr: "" });
        }
        break;

      default:
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const valid = Object.keys(errMsg).every((key) => {
      return errMsg[key as keyof typeof errMsg]?.trim().length === 0;
    });
    
    if (valid) {
      if (isLogin) {
        try {
          const response = await loginUser(formData.email, formData.password);
          if (response) {
            const { username, email,uid } = response;
            login( {username, email,uid} );
            toast("user Login Successfully");
            navigate("/");
          } else {
            toast("User Login Failed");
          }
        } catch (error) {
          if (error instanceof Error) {
            toast(error.message);
          } else {
            toast("An Unexpected Error Occured");
          }
        }
      } else {
        try {
          const response = await registerUser(
            formData.username,
            formData.email,
            formData.password
          );
           console.log(response);
          if (response) {
            console.log(response);
            const { username, email, uid } = response;
            login({username, email,uid} );
            toast("User created successfully");
            navigate("/");
          } else {
            toast("User creation failed");
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            toast(err.message);
          } else {
            toast("An Unexpected Error Occured");
          }
        }
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    validation(e.target.name, e.target.value);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0  bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 w-full max-w-md relative">
        <button
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          onClick={() => navigate("/")}
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center mb-8">
          <img src={Logo} className="w-32"/>
          <h2 className="text-2xl font-bold text-gray-800">
            {isLogin ? "Login" : "Create an Account"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <>
              <div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              {errMsg.usernameErr && (
                <div className="flex items-center gap-2 p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <p className="text-sm font-medium">{errMsg.usernameErr}</p>
                </div>
              )}
            </>
          )}

          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {errMsg.emailErr && (
            <div className="flex items-center gap-2 p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm font-medium">{errMsg.emailErr}</p>
            </div>
          )}

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          {errMsg.passwordErr && (
            <div className="flex items-center gap-2 p-2 text-red-600 bg-red-100 border border-red-400 rounded-lg">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-sm font-medium">{errMsg.passwordErr}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 font-semibold"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          {isLogin ? (
            <p>
              New to OLX?{" "}
              <button
                onClick={() => setIsLogin(false)}
                className="text-teal-700 hover:underline font-semibold"
              >
                Create an account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <button
                onClick={() => setIsLogin(true)}
                className="text-teal-700 hover:underline font-semibold"
              >
                Login
              </button>
            </p>
          )}
        </div>

        <p className="mt-6 text-xs text-center text-gray-500">
          By continuing, you agree to OLX's Terms of Use and Privacy Policy
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginPage;
