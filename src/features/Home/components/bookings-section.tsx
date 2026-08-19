"use client";

import { useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function BookingsSection() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-xs font-bold text-[#838896] uppercase">
        AGENDAMENTOS
      </h2>

      <Card className="rounded-xl border-[#26272B] bg-[#1A1B1F]/80 backdrop-blur-sm">
        <CardContent className="flex p-0">
          {/* Lado Esquerdo - Info */}
          <div className="flex flex-1 flex-col gap-3 p-5">
            <Badge className="text-primary w-fit bg-[#221C3D] text-xs font-bold hover:bg-[#221C3D]">
              Confirmado
            </Badge>
            <h3 className="text-base font-bold text-white">Corte de Cabelo</h3>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/avatar.png" alt="Vintage Barber" />
                <AvatarFallback>VB</AvatarFallback>
              </Avatar>
              <p className="text-sm font-normal text-white">Vintage Barber</p>
            </div>
          </div>

          {/* Lado Direito - Data/Hora */}
          <div className="flex flex-col items-center justify-center border-l border-solid border-[#26272B] px-8">
            <p className="text-sm text-white">Fevereiro</p>
            <p className="text-[28px] font-normal text-white">06</p>
            <p className="text-sm text-white">09:45</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
