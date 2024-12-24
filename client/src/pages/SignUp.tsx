import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import logo from "@/assets/login_image.svg";
import { useState } from "react";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }


  function handleSignUp() {}
  return (
    <div className="h-screen w-full  bg-gradient-to-r from-emerald-400 to-cyan-400">
      <div className="p-5 h-full flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[22rem] flex-col rounded-md shadow-lg">
          <img className="object-cover rounded-md" src={logo} alt="" />
          <div className="lg:w-[24rem] w-full flex flex-col  justify-center p-4 sm:p-6">
            <h2 className="text-center font-semibold text-2xl mb-4">Sign Up</h2>
            <form action="" onSubmit={handleSignUp}>
              <div className="">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <Input
                  placeholder="@Username"
                  id="username"
                  name="username"
                  type="text"
                  className="mt-1 mb-2"
                  value={formData.username}
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <Input
                  required
                  placeholder="xyz@gmail.com"
                  id="email"
                  type="email"
                  name="email"
                  className="mt-1 mb-2"
                  value={formData.email}
                  onChange={handleOnChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="font-semibold">
                  Password:
                </label>
                <Input
                  required
                  placeholder="*******"
                  id="password"
                  type="password"
                  className="mt-1"
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                />
              </div>
              <Button
                type="submit"
                className="w-full my-3 bg-gradient-to-tr from-cyan-400 to-emerald-400 font-semibold"
              >
                Signup
              </Button>
            </form>
            <p className="text-xs sm:text-sm mb-3">
              Allready have an account?
              <Link to={"/login"} className="text-blue-500 ml-1 cursor-pointer">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
