import BarbershopDetails from "@/features/BarbershopDetails";

interface BarbershopDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BarbershopDetail({
  params,
}: BarbershopDetailPageProps) {
  const { id } = await params;
  return <BarbershopDetails id={id} />;
}
