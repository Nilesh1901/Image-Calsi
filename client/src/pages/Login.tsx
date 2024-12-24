import { Button } from "@/components/ui/button";
// import React, { useRef, useState } from "react";

function Login() {
  const handleLogin = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h- w-full  bg-gradient-to-r from-emerald-400 to-cyan-400">
      <div className="p-5 flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[400px] flex-col rounded-md gap-10 shadow-lg">
          <img
            className="sm:max-w-md lg:max-w-xl w-full object-cover rounded-md"
            src="https://wallpaperbat.com/img/401988-minimalist-forest-wallpaper-top-free-minimalist-forest.jpg"
            alt=""
          />
          <div className="md:w-[410px] mx-auto flex-2 w-full p-5">
            <h2 className="text-center font-semibold text-2xl mb-5">Login</h2>
            <form action="" onSubmit={handleLogin}>
              <div className="mb-2">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <input
                  required
                  placeholder="@username"
                  id="username"
                  type="text"
                  className="mt-1"
                ></input>
              </div>
              <div>
                <label htmlFor="password" className="font-semibold">
                  Password:
                </label>
                <input
                  placeholder="*******"
                  id="password"
                  type="password"
                  className="mt-1"
                  required
                ></input>
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
              <span className="text-blue-500 ml-1 cursor-pointer">
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
