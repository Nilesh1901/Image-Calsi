import { Button } from "@/components/ui/button"


function SignUp() {

  function handleSignUp(){}
  return (
    <div className="flex sm:w-auto w-full lg:flex-row lg:h-[630px] flex-col rounded-md gap-10 shadow-lg">
    <img
      className="max-w-lg hidden lg:inline-block shrink-2 object-cover rounded-md"
      src="https://wallpaperbat.com/img/401988-minimalist-forest-wallpaper-top-free-minimalist-forest.jpg"
      alt=""
    />
    <div className="sm:w-[430px] mx-auto flex-2 w-full p-5">
      <h2 className="text-center font-semibold text-2xl mb-5">
        Sign Up
      </h2>
      <form action="" onSubmit={handleSignUp}>
        <div className="mb-2 mt-2">
          <label htmlFor="name" className="font-semibold">
            Name:
          </label>
          <input
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
          <input
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
          <input
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
        <span
          className="text-blue-500 ml-1 cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  </div>
  )
}

export default SignUp