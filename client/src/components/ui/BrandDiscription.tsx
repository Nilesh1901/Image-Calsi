import Typewriter from "typewriter-effect";

function BrandDiscription() {
  return (
    <div className=" w-full text-center flex flex-col items-center gap-16 justify-center mt-10 text-white">
      <p className="text-xl text-zinc-200 text-center font-light w-1/2 ">
        Calsi is a smart and playful app that does the math for you! Simply
        upload an image of your items, and Calsi instantly calculates the total
        sum of the products—saving you time and effort. It's math made easy,
        fun, and hassle-free!
      </p>
      <AutoTypingTagline />
    </div>
  );
}

function AutoTypingTagline() {
  return (
    <div className="text- font-medium text-center">
      <Typewriter
        options={{
          strings: [
            "Calsi: Turning your pics into quick math tricks—because numbers love selfies too!",
          ],
          autoStart: true,
          loop: true,
        }}
      />
    </div>
  );
}

export default BrandDiscription;
