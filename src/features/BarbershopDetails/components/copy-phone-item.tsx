"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, SmartphoneIcon } from "lucide-react";

interface CopyPhoneItemProps {
  phone: string;
}

export function CopyPhoneItem({ phone }: CopyPhoneItemProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phone);
    setCopied(true);
  };

  useEffect(() => {
    if (!copied) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCopied(false);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [copied]);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon className="text-white" size={20} />
        <p className="text-sm text-white">{phone}</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="h-8 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold text-white hover:bg-[#26272B]"
        onClick={handleCopyPhone}
      >
        {copied ? <CheckIcon size={16} className="text-primary" /> : "Copiar"}
      </Button>
    </div>
  );
}
