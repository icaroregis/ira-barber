"use client";

import { useSession } from "next-auth/react";
import { formatWelcomeDate } from "@/lib/utils";

interface WelcomeGreetingProps {
  variant?: "mobile" | "desktop";
}

export default function WelcomeGreeting({
  variant = "mobile",
}: WelcomeGreetingProps) {
  const { data: session } = useSession();
  const isAuthenticated = !!session?.user;
  const userName = session?.user?.name;
  const formattedDate = formatWelcomeDate();

  const containerClass =
    variant === "mobile"
      ? "flex flex-col gap-1 px-5 py-6"
      : "flex flex-col gap-1";
  const titleClass = variant === "mobile" ? "text-xl" : "text-3xl text-white";
  const titleUnauthenticatedClass =
    variant === "desktop" ? "text-3xl font-bold text-white" : titleClass;
  const dateClass =
    variant === "mobile" ? "text-sm" : "text-base text-gray-300";

  return (
    <div className={containerClass}>
      {isAuthenticated && userName ? (
        <h2 className={titleClass}>
          <span className="font-bold">{userName}</span>
        </h2>
      ) : (
        <h2 className={titleUnauthenticatedClass}>
          {variant === "desktop" ? (
            <>Olá, Faça seu login!</>
          ) : (
            <>
              Olá. <span className="font-bold">Faça seu login!</span>
            </>
          )}
        </h2>
      )}
      <p className={dateClass}>{formattedDate}</p>
    </div>
  );
}
