import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import logo from "@/assets/login_image.svg";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";

import axios from "axios";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("/api/auth/login", formData);
      const data = res.data;
      if (data.success) {
        setSuccessMsg(data.message || "Login successful!");
        setLoading(false);
        toast({
          title: successMsg!,
          description: "success",
        });
        navigate("/");
      } else {
        throw new Error(data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      toast({
        title: error!,
        description: "error",
      });
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-custom-beige">
      <div className="p-5 h-full flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[22rem] bg-white flex-col rounded-md shadow-lg">
          <img className="object-cover rounded-md" src={logo} alt="Login" />
          <div className="md:w-[24rem] mx-auto w-full p-5">
            <h2 className="text-center font-semibold text-2xl mb-5">Login</h2>
            <form action="" onSubmit={handleLogin}>
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
              <div className="mb-2">
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
                disabled={loading}
                className={`w-full my-5 font-semibold ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-tr from-cyan-400 to-emerald-400"
                }`}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
            <p className="text-xs sm:text-sm text-center">
              Don't have an account?
              <Link to="/signup" className="text-blue-500 ml-1 cursor-pointer">
                Register
              </Link>
            </p>
          </div>
        </div>
        {error && <Toaster />}
        {successMsg && <Toaster />}
      </div>
    </div>
  );
}

export default Login;
