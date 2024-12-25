import Header from "@/components/ui/Header";
import BrandDiscription from "@/components/ui/BrandDiscription";
import UploadSection from "@/components/ui/UploadSection";

function Home() {
  return (
    <div className="bg-[#264653] h-screen w-full text-center">
      <Header />
      <BrandDiscription />
      <UploadSection />
    </div>
  );
}

export default Home;
