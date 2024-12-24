import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import logo from "@/assets/login_image.svg";
import { useState } from "react";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <div className="h-screen w-full  bg-gradient-to-r from-emerald-400 to-cyan-400">
      <div className="p-5 h-full flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[22rem] flex-col rounded-md shadow-lg">
          <img className="object-cover rounded-md" src={logo} alt="" />
          <div className="md:w-[24rem] mx-auto  w-full p-5">
            <h2 className="text-center font-semibold text-2xl mb-5">Login</h2>
            <form action="">
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
                  className="mt-1"
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
