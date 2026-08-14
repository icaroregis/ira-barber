import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { CalendarIcon, UserIcon } from "lucide-react";

export default function HeaderDesktop() {
  return (
    <Card className="border-border bg-background rounded-none border-x-0 border-t-0 border-b border-solid py-0 ring-0">
      <CardContent className="flex flex-row items-center justify-between px-32 py-7">
        <Image
          src="/logo.jpeg"
          alt="IRA Barber Logo"
          width={130}
          height={22}
          loading="eager"
          style={{ width: "auto", height: "auto" }}
        />

        <div className="flex flex-row items-center gap-6">
          <Button
            variant="outline"
            className="flex h-9 flex-row items-center gap-2 rounded-lg px-4 text-sm font-bold"
          >
            <CalendarIcon size={16} />
            Agendamentos
          </Button>

          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground flex h-9 flex-row items-center gap-2 rounded-lg px-4 text-sm font-bold">
            <UserIcon size={16} />
            Perfil
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
