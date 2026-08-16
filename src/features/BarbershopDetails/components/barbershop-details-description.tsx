interface BarbershopDetailsDescriptionProps {
  description: string;
}

export function BarbershopDetailsDescription({
  description,
}: BarbershopDetailsDescriptionProps) {
  return (
    <div className="flex flex-col gap-3 px-5 py-6">
      <h2 className="text-xs font-bold text-[#838896] uppercase">Sobre Nós</h2>
      <p className="text-sm leading-relaxed text-white">{description || ""}</p>
    </div>
  );
}
