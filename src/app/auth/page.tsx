import Auth from "@/components/Auth";
import Image from "next/image";

export default function page() {
  return (
    <div className="h-screen lg:flex">
      <div className="w-1/2 h-full p-5 hidden lg:block">
        <div className="rounded-lg h-full">
          <Image
            src={"/clouds.webp"}
            alt="clouds"
            className="object-cover w-full h-full rounded-lg opacity-70"
            width={500}
            height={1000}
          />
        </div>
      </div>
      <Auth />
    </div>
  );
}
