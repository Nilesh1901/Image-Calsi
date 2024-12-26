import Header from "@/components/ui/Header";
import BrandDiscription from "@/components/ui/BrandDiscription";
import UploadSection from "@/components/ui/UploadSection";
import { Toaster } from "@/components/ui/toaster";

function Home() {
  return (
    <div className="bg-[#264653] min-h-screen w-full text-center">
      <Header />
      <BrandDiscription />
      <UploadSection />
      <Toaster />
    </div>
  );
}

export default Home;
