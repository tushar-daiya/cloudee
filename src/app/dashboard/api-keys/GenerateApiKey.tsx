"use client";

import { createApiKey } from "@/app/actions/doers";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function GenerateApiKey() {
  const handleClick = async () => {
    let toastId = toast.loading("Generating API Key");
    const res = await createApiKey();
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("API Key generated successfully");
    } else {
      toast.error("Failed to generate API Key");
    }
  };
  return (
    <Button className="mt-8" onClick={handleClick}>
      Generate API Key
    </Button>
  );
}
