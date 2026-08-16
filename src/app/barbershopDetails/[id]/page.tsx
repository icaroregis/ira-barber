import BarbershopDetails from "@/features/BarbershopDetails";

export default async function BarbershopDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BarbershopDetails id={id} />;
}
