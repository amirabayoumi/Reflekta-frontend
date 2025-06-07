"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareButton() {
  const copyToClipboard = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      toast("Link copied!", {
        description: "Story link has been copied to clipboard",
      });
    } catch (error) {
      console.error("Failed to copy: ", error);
      toast.error("Failed to copy", {
        description: "Please try again",
      });
    }
  };

  return (
    <button
      className="flex items-center text-gray-600 hover:text-[#553a5c] group relative"
      onClick={copyToClipboard}
      aria-label="Share this story"
    >
      <Share2 size={20} />
      <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        Copy link
      </span>
    </button>
  );
}
