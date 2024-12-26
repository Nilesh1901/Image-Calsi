import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import logo from "@/assets/login_image.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "@/app/features/userSlice";

function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const user = useSelector((state: any) => state.user);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.username || user._id) {
      navigate("/");
    }
  }, [user, navigate]);

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>): void {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await axios.post("/api/auth/signup", formData);
      const data = res.data;

      if (data.success) {
        dispatch(signInSuccess(data.user));
        setSuccessMsg(data.message || "Signup successful!");
        setLoading(false);
        toast({
          title: successMsg!,
          description: "success",
        });
        navigate("/");
      } else {
        throw new Error(data.message || "Signup failed");
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
    <div className="h-screen w-full bg-[#d7c9bc]">
      <div className="p-5 h-full flex items-center justify-center">
        <div className="flex lg:flex-row lg:h-[22rem] bg-white flex-col rounded-md shadow-lg">
          <img
            className="object-cover rounded-md"
            src={logo}
            alt="Signup Logo"
          />
          <div className="lg:w-[24rem] w-full flex flex-col justify-center p-4 sm:p-6">
            <h2 className="text-center font-semibold text-2xl my-2">Sign Up</h2>
            <form action="" onSubmit={handleSignup}>
              <div>
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
                disabled={loading} // Disable button while loading
              >
                {loading ? "Signing Up..." : "Signup"}
              </Button>
            </form>

            <p className="text-xs sm:text-sm ">
              Already have an account?
              <Link to="/login" className="text-blue-500 ml-1 cursor-pointer">
                Login
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

export default SignUp;
