import { MapPinIcon, StarIcon } from "lucide-react";

interface BarbershopDetailsInfoProps {
  name: string;
  address: string;
}

export function BarbershopDetailsInfo({
  name,
  address,
}: BarbershopDetailsInfoProps) {
  return (
    <div className="flex flex-col gap-3 border-b border-solid border-[#26272B] px-5 pt-6 pb-6">
      <h1 className="text-xl font-bold text-white">{name}</h1>

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <MapPinIcon className="text-primary" size={16} />
          <p className="text-sm text-white">{address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary fill-primary" size={16} />
          <p className="text-sm text-white">5,0 (889 avaliações)</p>
        </div>
      </div>
    </div>
  );
}
