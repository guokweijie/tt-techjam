"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function CaptionModal({
  open,
  setIsOpen,
  onSubmit,
}: {
  open: boolean;
  setIsOpen: (open: boolean) => void;
  onSubmit: (caption: string) => void;
}) {
  const [caption, setCaption] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(caption);
    setIsOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Caption</DialogTitle>
          <DialogDescription>
            Fill in the caption for your upload.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Textarea
              name="caption"
              placeholder="Tell us more about your upload"
              rows={6}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <Button variant="link" className="px-0">
              Generate caption with AI
            </Button>
          </div>
          <Button className="w-full font-normal" type="submit">
            Submit
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
