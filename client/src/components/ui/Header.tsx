import brandLogo from "@/assets/Brand_logo.jpg";
import profileIcon from "@/assets/default_profile_icon.jpg";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { signOutSuccess } from "@/app/features/userSlice";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

function Header() {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await axios.post("/api/auth/logout"); // Ensure the endpoint is correct
      const { message } = res.data;

      console.log(message);

      dispatch(signOutSuccess());

      toast({
        title: message || "Logout successful",
        description: "success",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred.";

      toast({
        title: errorMessage,
        description: "error",
      });
    }
  };
  return (
    <>
      <div className="w-full p-4 px-12 flex items-center bg-[#415a77] text-white justify-between shadow-sm">
        {/* brand logo */}
        <div className=" flex items-center gap-3">
          <img src={brandLogo} className="w-12 rounded-full " alt="" />
          <h1 className="font-extrabold text-2xl">Image Clasi</h1>
        </div>
        <div>
          {user.username ? (
            <div className="flex items-center gap-3">
              <img
                src={profileIcon}
                className="w-12 rounded-full object-cover"
                alt=""
              />
              <h1 className=" font-medium text-lg">{user.username}</h1>
              <Button onClick={handleLogout}>Log Out</Button>
            </div>
          ) : (
            <div className="flex gap-4 text-black pr-10">
              <Button variant={"outline"} onClick={() => navigate("/signup")}>
                Sign Up
              </Button>
              <Button variant={"outline"} onClick={() => navigate("/login")}>
                Login
              </Button>
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default Header;
