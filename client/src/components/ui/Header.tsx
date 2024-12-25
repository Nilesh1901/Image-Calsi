import brandLogo from "@/assets/Brand_logo.jpg";
import profileIcon from "@/assets/default_profile_icon.jpg";
import { Button } from "@/components/ui/button";

function Header() {
  const user = true;
  return (
    <div className="w-full p-4 px-12 flex items-center bg-[#415a77] text-white justify-between shadow-sm">
      {/* brand logo */}
      <div className=" flex items-center gap-3">
        <img src={brandLogo} className="w-12 rounded-full " alt="" />
        <h1 className="font-extrabold text-2xl">Image Clasi</h1>
      </div>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <img
              src={profileIcon}
              className="w-12 rounded-full object-cover"
              alt=""
            />
            <h1 className=" font-medium text-lg">Nilesh patel</h1>
            <Button>Log Out</Button>
          </div>
        ) : (
          <div className="flex gap-4 text-black pr-10">
            <Button variant={"outline"}>Sign Up</Button>
            <Button variant={"outline"}>Login</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
