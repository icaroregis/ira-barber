import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { MenuIcon } from "lucide-react";

export default function HeaderMobile() {
  return (
    <Card className="border-border bg-background rounded-none border-x-0 border-t-0 border-b border-solid py-0 ring-0">
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image
          src="/logo.svg"
          alt="FSW Barber Logo"
          width={130}
          height={22}
          loading="eager"
        />
        <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg">
          <MenuIcon size={20} />
        </Button>
      </CardContent>
    </Card>
  );
}
