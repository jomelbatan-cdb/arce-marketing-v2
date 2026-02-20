import { useState } from "react";
import { Copy, Check, Facebook, MessageCircle, Share2 } from "lucide-react";

interface ShareActionsProps {
  url: string;
  title?: string;
}

export default function ShareActions({ url, title = "" }: ShareActionsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  const open = (shareUrl: string) => {
    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-3">
      {/* Copy link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        className="flex size-8 items-center justify-center rounded-full border border-black hover:bg-zinc-100 transition"
      >
        {copied ? (
          <Check size={18} className="text-green-600" />
        ) : (
          <Copy size={18} className="text-primary-muted" />
        )}
      </button>

      {/* Facebook */}
      <button
        aria-label="Share on Facebook"
        onClick={() =>
          open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)
        }
        className="flex size-8 items-center justify-center rounded-full border border-black hover:bg-zinc-100 transition"
      >
        <Facebook size={18} className="text-primary-muted" />
      </button>

      {/* Messenger (generic message icon) */}
      <button
        aria-label="Share via Messenger"
        onClick={() =>
          open(
            `https://www.facebook.com/dialog/send?link=${encodedUrl}&redirect_uri=${encodedUrl}`
          )
        }
        className="flex size-8 items-center justify-center border-black rounded-full border hover:bg-zinc-100 transition"
      >
        <MessageCircle size={18} className="text-primary-muted" />
      </button>

      {/* TikTok (generic share icon) */}
      <button
        aria-label="Share on TikTok"
        onClick={() => open("https://www.tiktok.com")}
        className="flex size-8 items-center justify-center border-black rounded-full border hover:bg-zinc-100 transition"
      >
        <Share2 size={18} className="text-primary-muted" />
      </button>
    </div>
  );
}
