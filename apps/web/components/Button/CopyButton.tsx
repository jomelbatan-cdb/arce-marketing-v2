import { useState } from "react";
import { Clipboard, Check } from "lucide-react";
import toast from "react-hot-toast";

type CopyButtonProps = {
  textToCopy: string;
  duration?: number; // ms before reverting back
};

export default function CopyButton({
  textToCopy,
  duration = 3000,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), duration);
      toast.success("Copied on Clipboard", { position: "bottom-right" });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`transition-colors
        ${copied ? "text-green-500" : "text-gray-800"}`}
    >
      {copied ? <Check size={18} /> : <Clipboard size={18} />}
    </button>
  );
}
