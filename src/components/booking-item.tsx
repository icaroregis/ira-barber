import { Badge } from "@/components/ui/badge";
import { format, isFuture } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface BookingItemProps {
  status?: string | Date;
  serviceName?: string;
  barbershopName?: string;
  barbershopAvatar?: string;
  month?: string;
  day?: string;
  time?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export function BookingItem({
  status = "Confirmado",
  serviceName = "Corte de Cabelo",
  barbershopName = "Vintage Barber",
  barbershopAvatar = "/avatar.png",
  month = "Fevereiro",
  day = "06",
  time = "09:45",
  onClick,
  isActive,
}: BookingItemProps) {
  const isConfirmed =
    typeof status === "string" ? status === "Confirmado" : isFuture(status);

  return (
    <Card
      onClick={onClick}
      className={`rounded-xl border-[#26272B] bg-[#1A1B1F] ${
        onClick ? "cursor-pointer hover:border-gray-500" : ""
      } ${isActive ? "border-gray-500 bg-[#26272B]/30" : ""}`}
    >
      <CardContent className="flex p-0">
        {/* Lado Esquerdo - Info */}
        <div className="flex flex-1 flex-col gap-2 py-3 pr-5 pl-3">
          <Badge
            className={`w-fit text-xs font-bold ${
              isConfirmed
                ? "text-primary bg-[#221C3D] hover:bg-[#221C3D]"
                : "bg-[#26272B] text-[#838896] hover:bg-[#26272B]"
            }`}
          >
            {typeof status === "string"
              ? status
              : format(status, "yyyy-MM-dd HH:mm")}
          </Badge>
          <h3 className="text-base font-bold text-white">{serviceName}</h3>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={barbershopAvatar} alt={barbershopName} />
              <AvatarFallback>
                {barbershopName.charAt(0)}
                {barbershopName.split(" ")[1]?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <p className="text-sm font-normal text-white">{barbershopName}</p>
          </div>
        </div>

        {/* Lado Direito - Data/Hora */}
        <div className="flex w-26.5 shrink-0 flex-col items-center justify-center border-l border-solid border-[#26272B] px-9 py-3">
          <p className="text-xs text-white">{month}</p>
          <p className="text-2xl font-normal text-white">{day}</p>
          <p className="text-xs text-white">{time}</p>
        </div>
      </CardContent>
    </Card>
  );
}
