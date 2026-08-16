import { db } from "@/lib/prisma";

export default async function BarbershopDetails({ id }: { id: string }) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
  });

  if (!barbershop) {
    return <div>Barbershop not found</div>;
  }

  return (
    <div>
      <h1>{barbershop.name}</h1>
    </div>
  );
}
