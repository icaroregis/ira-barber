"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import SidebarSheet from "../sidebar-sheet";
import { useSession } from "next-auth/react";
import { CalendarIcon, LogInIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function HeaderDesktop() {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;

  return (
    <header className="flex h-24 w-full items-center justify-between border-b border-[#26272B] bg-[#1A1B1F] px-32">
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/logo.jpeg"
            alt="IRA Barber Logo"
            width={130}
            height={22}
            loading="eager"
            style={{ width: "auto", height: "auto" }}
          />
        </Link>
      </div>

      {/* DIREITA (Agendamentos e Perfil / Login) */}
      <div className="flex items-center gap-6">
        {isAuthenticated ? (
          <>
            <Button
              asChild
              variant="ghost"
              className="hover:text-primary flex items-center gap-2 text-sm font-bold text-white hover:bg-transparent"
            >
              <Link href="/bookings">
                <CalendarIcon size={16} />
                Agendamentos
              </Link>
            </Button>

            <SidebarSheet>
              <button
                type="button"
                className="flex items-center gap-2 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                aria-label="Abrir menu do perfil"
              >
                <Avatar className="h-9 w-9">
                  <AvatarImage src={session?.user?.image || ""} />
                  <AvatarFallback>
                    {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-bold text-white">
                  {session?.user?.name || "Usuário"}
                </span>
              </button>
            </SidebarSheet>
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
            <SidebarSheet>
              <Button className="bg-primary hover:bg-primary/90 flex items-center gap-2 rounded-lg px-6 text-sm font-bold text-white">
                <LogInIcon size={16} />
                Perfil
              </Button>
            </SidebarSheet>
          </>
        )}
      </div>
    </header>
  );
}
