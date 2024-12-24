import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import logo from "@/assets/login_image.svg";

function SignUp() {
  function handleSignUp() {}
  return (
    <div className="h-screen w-full  bg-gradient-to-r from-emerald-400 to-cyan-400">
      <div className="p-5 h-full flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[24rem] flex-col rounded-md shadow-lg">
          <img
            className="sm:max-w-sm  md:w-auto object-cover rounded-md"
            src={logo}
            alt=""
          />
          <div className="lg:w-[30rem] w-full flex flex-col justify-center p-4 sm:p-6">
            <h2 className="text-center font-semibold text-2xl mb-5">Sign Up</h2>
            <form action="" onSubmit={handleSignUp}>
              <div className="mb-2 mt-2">
                <label htmlFor="name" className="font-semibold">
                  Name:
                </label>
                <Input
                  placeholder="name"
                  id="name"
                  type="text"
                  className="mt-1"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <Input
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
                Signup
              </Button>
            </form>
            <p className="text-xs sm:text-sm mb-2">
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
