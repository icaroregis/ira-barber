import Image from "next/image";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { CalendarIcon, LogInIcon } from "lucide-react";

export default function HeaderDesktop() {
  const isAuthenticated = true;

  return (
    <header className="flex h-24 w-full items-center justify-between border-b border-[#26272B] bg-[#1A1B1F] px-32">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="IRA Barber" width={130} height={22} />
      </div>

      {/* DIREITA (Agendamentos e Perfil / Login) */}
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Button
              variant="ghost"
              className="hover:text-primary flex items-center gap-2 text-sm font-bold text-white hover:bg-transparent"
            >
              <CalendarIcon size={16} />
              Agendamentos
            </Button>
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage src="/avatar.png" />
                <AvatarFallback>MI</AvatarFallback>
              </Avatar>
              <span className="text-sm font-bold text-white">
                Miguel Silva Menezes
              </span>
            </div>
          </>
        ) : (
          <>
            <Button
              variant="ghost"
              className="hover:text-primary flex items-center gap-2 text-sm font-bold text-white hover:bg-transparent"
            >
              <CalendarIcon size={16} />
              Agendamentos
            </Button>
            <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-6 text-sm font-bold text-white">
              <LogInIcon size={16} />
              Perfil
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
