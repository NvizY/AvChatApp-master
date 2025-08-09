import React from 'react';
import { useForm } from "react-hook-form";
import api from '../lib/api.js';
import { useAuth } from '../Context/Authprovider';
import { Link } from 'react-router-dom';


const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullname: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch("password");
  const [_, setAuthUser] = useAuth();

  const onSubmit = async(data) => {
    const userInfo={
      fullname: data.fullname,
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword
    };
    await api.post("/api/user/signup",userInfo)
    .then((response)=>{
      if(response.data){
        alert("Signup Successful");
      }
      localStorage.setItem("ChatApp",JSON.stringify(response.data));
      setAuthUser(response.data);
    })
    .catch((error)=>{
      if(error.response){
        alert("Error: "+error.response.data.error);
      }
    });
  };


  return (
    <div className="bg-blue-300 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create an Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 text-gray-600 font-semibold">
              Full Name
            </label>
            {errors.fullname && <span className="text-red-500 text-sm">This field is required</span>}
            <input
              type="text"
              placeholder="Fullname"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("fullname", { required: true })}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-semibold">
              Email
            </label>
            {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("email", { 
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
            />
            {errors.email?.type === "pattern" && (
              <span className="text-red-500 text-sm">Invalid email address</span>
            )}
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-semibold">
              Password
            </label>
            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message || "This field is required"}
              </span>
            )}
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("password", { 
                required: true,
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters"
                }
              })}
            />
          </div>

          <div>
            <label className="block mb-1 text-gray-600 font-semibold">
              Confirm Password
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500 text-sm">
                {errors.confirmPassword.message || "This field is required"}
              </span>
            )}
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              {...register("confirmPassword", { 
                required: true,
                validate: value => value === password || "Passwords do not match"
              })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 cursor-pointer transition duration-200"
          >
            Sign Up
          </button>

          <p className="text-sm text-center mt-4 text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;