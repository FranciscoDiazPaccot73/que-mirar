import {
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@/components/ui/popover";
import { Check, ClipboardCopy, Share as ShareIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { PageContext } from "@/context";
import { Button } from "../ui/button";
import { WhatsappIcon } from "../icons/WhatsappIcon";

const getText = (title: string, votes: number, url: string) =>
  `Ver ${title} - ${votes} de 10 | ${url}`;

export const Share = () => {
  const {
    state: { content },
  } = useContext(PageContext);
  const [copied, setIsCopied] = useState(false);
  const [href, setHref] = useState("");
  const { vote_average: votes, title, name } = content || {};

  useEffect(() => {
    const encodedUrl = encodeURIComponent(window.location.href);
    let text = encodedUrl;

    if (content) {
      text = getText(title || name, votes.toFixed(2), encodedUrl);
    }

    setHref(`https://api.whatsapp.com/send?text=${text}`);
  }, [votes]);

  const copyToClipboard = () => {
    const text = getText(title || name, votes.toFixed(2), window.location.href);

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" title="Compartir" variant="site">
          <ShareIcon className="w-4 h-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[150px] p-2 bg-gray-900 border-purple-hover">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-100">Compartir</h3>
          <div className="w-full h-[1px] bg-purple-50" />
          <div className="space-y-2">
            <button
              className="w-full text-purple text-sm flex justify-between items-center p-1 rounded-sm hover:bg-purple-12"
              onClick={copyToClipboard}
            >
              <p>Copiar</p>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <ClipboardCopy className="w-4 h-4" />
              )}
            </button>
            <a
              className="w-full text-purple text-sm flex justify-between items-center p-1 rounded-sm hover:bg-purple-12"
              href={href}
              rel="noreferrer"
              target="_blank"
            >
              <p>Whatsapp</p>
              <WhatsappIcon />
            </a>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
