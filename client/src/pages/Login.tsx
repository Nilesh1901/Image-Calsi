import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import logo from "@/assets/login_image.svg";
// import React, { useRef, useState } from "react";

function Login() {
  // const handleLogin = (e) => {
  //   e.preventDefault();
  // };

  return (
    <div className="h-screen w-full  bg-gradient-to-r from-emerald-400 to-cyan-400">
      <div className="p-5 h-full flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[400px] flex-col rounded-md gap-10 shadow-lg">
          <img
            className="sm:max-w-md  w-full object-cover rounded-md"
            src={logo}
            alt=""
          />
          <div className="md:w-[410px] mx-auto flex-2 w-full p-5">
            <h2 className="text-center font-semibold text-2xl mb-5">Login</h2>
            <form action="">
              <div className="mb-2">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <Input
                  required
                  placeholder="@username"
                  id="username"
                  type="text"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="password" className="font-semibold">
                  Password:
                </label>
                <Input
                  placeholder="*******"
                  id="password"
                  type="password"
                  className="mt-1"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full my-5 bg-gradient-to-tr from-cyan-400 to-emerald-400 font-semibold"
              >
                Login
              </Button>
            </form>
            <p className="text-xs sm:text-sm ">
              Don't have an account?
              <Link
                to={"/signup"}
                className="text-blue-500 ml-1 cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
