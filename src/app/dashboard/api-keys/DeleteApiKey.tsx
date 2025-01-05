"use client";

import { deleteApiKey } from "@/app/actions/doers";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function DeleteApiKey() {
  const handleClick = async () => {
    let toastId = toast.loading("Deleting API Key");
    const res = await deleteApiKey();
    toast.dismiss(toastId);
    if (res.success) {
      toast.success("API Key deleted successfully");
    } else {
      toast.error("Failed to delete API Key");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"}>Delete</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete API key?</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete your API key? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleClick} variant={"destructive"}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
