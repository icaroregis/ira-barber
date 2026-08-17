import Image from "next/image";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";
import HeaderMenuSheet from "../sidebar-sheet";
import { Card, CardContent } from "../ui/card";

export default function HeaderMobile() {
  const isAuthenticated = true;

  return (
    <Card className="border-border bg-background rounded-none border-x-0 border-t-0 border-b border-solid py-0 ring-0">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src="/logo.jpeg"
          alt="IRA Barber Logo"
          width={130}
          height={22}
          loading="eager"
          style={{ width: "auto", height: "auto" }}
        />

        <HeaderMenuSheet isAuthenticated={isAuthenticated}>
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-lg"
            aria-label="Abrir menu"
          >
            <MenuIcon size={20} />
          </Button>
        </HeaderMenuSheet>
      </CardContent>
    </Card>
  );
}
