"use client";

import { SmartphoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BarbershopDetailsContactProps {
  phones: string[];
}

export function BarbershopDetailsContact({
  phones,
}: BarbershopDetailsContactProps) {
  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
  };

  return (
    <div className="flex flex-col gap-3 border-t border-solid border-[#26272B] px-5 py-6">
      <h2 className="text-xs font-bold text-[#838896] uppercase">Contato</h2>

      <div className="flex flex-col gap-4">
        {phones.map((phone, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SmartphoneIcon className="text-white" size={20} />
              <p className="text-sm text-white">{phone}</p>
            </div>

            <Button
              variant="outline"
              size="sm"
              className="h-8 rounded-lg border-[#26272B] bg-[#1A1B1F] px-4 text-sm font-bold text-white hover:bg-[#26272B]"
              onClick={() => handleCopyPhone(phone)}
            >
              Copiar
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
