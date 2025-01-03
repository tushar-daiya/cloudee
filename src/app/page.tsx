import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default function Home() {
  return (
    <div>
      <div className="absolute inset-0 bg-grid -z-10 [mask-image:linear-gradient(to_bottom,white_20%,transparent_80%)] pointer-events-none select-none"></div>
      <Header />
      <div className="max-w-6xl mx-auto p-5 min-h-[calc(100vh-5rem)]">
        <h1 className="text-8xl mt-20 font-extrabold text-accent-foreground">
          <span className="text-primary">Cloudee</span> - Cloud storage for
          everyone
        </h1>
        <p className="text-xl mt-3 font-medium text-muted-foreground">
          Store and access your files from anywhere for free.
        </p>
        <div className="flex mt-10 items-center gap-5">
          <Button className="h-14 w-[200px] text-xl">Get started</Button>
          <Button variant={"ghost"} className="h-14 w-[200px] text-xl">
            View Api Docs
          </Button>
        </div>
      </div>
    </div>
  );
}
