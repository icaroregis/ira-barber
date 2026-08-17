"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import type { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import {
  CalendarIcon,
  CircleIcon,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  XIcon,
} from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

const primaryItems = [
  {
    label: "Início",
    icon: <HomeIcon size={16} />,
    active: true,
    href: "/",
  },
  {
    label: "Agendamentos",
    icon: <CalendarIcon size={16} />,
  },
];

const serviceItems = [
  {
    label: "Cabelo",
    icon: (
      <Image
        src="/scissors-icon.svg"
        alt=""
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Barba",
    icon: (
      <Image
        src="/mustache-icon.svg"
        alt=""
        width={16}
        height={16}
        aria-hidden
      />
    ),
  },
  {
    label: "Acabamento",
    icon: (
      <Image src="/razor-icon.svg" alt="" width={16} height={16} aria-hidden />
    ),
  },
  {
    label: "Sobrancelha",
    icon: <CircleIcon size={10} className="fill-current" />,
  },
  {
    label: "Massagem",
    icon: <CircleIcon size={10} className="fill-current" />,
  },
  {
    label: "Hidratação",
    icon: <CircleIcon size={10} className="fill-current" />,
  },
];

interface HeaderMenuSheetProps {
  children: ReactNode;
  isAuthenticated: boolean;
}

function MenuItem({
  icon,
  label,
  active = false,
  href,
  onClick,
}: {
  icon: ReactNode;
  label: string;
  active?: boolean;
  href?: string;
  onClick?: () => void;
}) {
  const className =
    "flex w-full items-center gap-3 rounded-[10px] px-4 py-3 text-left text-sm transition-colors";

  if (href) {
    return (
      <SheetClose asChild>
        <Link
          href={href}
          className={`${className} ${
            active
              ? "bg-primary text-white"
              : "hover:bg-muted text-white/90 hover:text-white"
          }`}
        >
          <span className="flex h-4 w-4 items-center justify-center">
            {icon}
          </span>
          <span>{label}</span>
        </Link>
      </SheetClose>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${className} ${
        active
          ? "bg-primary text-white"
          : "hover:bg-muted text-white/90 hover:text-white"
      }`}
    >
      <span className="flex h-4 w-4 items-center justify-center">{icon}</span>
      <span>{label}</span>
    </button>
  );
}

export default function HeaderMenuSheet({
  children,
  isAuthenticated,
}: HeaderMenuSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent
        side="right"
        className="border-border bg-background h-screen w-87.5 max-w-[calc(100vw-40px)] gap-0 border-l px-0 py-6"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-5">
            <SheetTitle className="text-lg font-bold text-white">
              Menu
            </SheetTitle>
            <SheetClose asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-lg"
                aria-label="Fechar menu"
              >
                <XIcon size={20} />
              </Button>
            </SheetClose>
          </div>

          <div className="mt-6 flex items-center justify-between px-5">
            <div className="flex min-h-12 items-center gap-3">
              {isAuthenticated ? (
                <>
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>MS</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-lg font-bold text-white">
                      Miguel Silva Menezes
                    </p>
                    <p className="text-[12px] text-white/60">
                      miguel.silva.menezes@example.com
                    </p>
                  </div>
                </>
              ) : (
                <p className="text-lg font-bold text-white">
                  Olá. Faça seu login!
                </p>
              )}
            </div>

            {!isAuthenticated && (
              <Button
                size="icon"
                className="bg-primary hover:bg-primary/90 h-10 w-10 rounded-[10px]"
                aria-label="Fazer login"
              >
                <LogInIcon size={16} />
              </Button>
            )}
          </div>

          <div className="border-border mt-6 border-t" />

          <div className="flex flex-col gap-1 px-5 py-4">
            {primaryItems.map((item) => (
              <MenuItem
                key={item.label}
                label={item.label}
                icon={item.icon}
                active={item.active}
                href={item.href}
              />
            ))}
          </div>

          <div className="border-border border-t" />

          <div className="flex flex-col gap-1 px-5 py-4">
            {serviceItems.map((item) => (
              <MenuItem key={item.label} label={item.label} icon={item.icon} />
            ))}
          </div>

          {isAuthenticated && (
            <>
              <div className="border-border border-t" />
              <div className="flex flex-col gap-1 px-5 py-4">
                <MenuItem
                  label="Sair da conta"
                  icon={<LogOutIcon size={16} />}
                />
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
