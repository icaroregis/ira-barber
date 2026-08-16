import { db } from "@/lib/prisma";
import { BarbershopDetailsHeader } from "./components/barbershop-details-header";
import { BarbershopDetailsInfo } from "./components/barbershop-details-info";
import { BarbershopDetailsDescription } from "./components/barbershop-details-description";
import { ServiceItem } from "./components/service-item";
import { BarbershopDetailsContact } from "./components/barbershop-details-contact";
import Footer from "@/components/footer/footer";

export default async function BarbershopDetails({ id }: { id: string }) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return <div>Barbershop not found</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      <main className="flex-1">
        <BarbershopDetailsHeader
          imageUrl={barbershop.imageUrl}
          name={barbershop.name}
        />

        <div className="mx-auto max-w-[1440px]">
          <BarbershopDetailsInfo
            name={barbershop.name}
            address={barbershop.address}
          />

          <BarbershopDetailsDescription description={barbershop.description} />

          <div className="flex flex-col gap-3 border-t border-solid border-[#26272B] px-5 py-6">
            <h2 className="text-xs font-bold text-[#838896] uppercase">
              Serviços
            </h2>
            <div className="flex flex-col gap-3">
              {barbershop.services.map((service) => (
                <ServiceItem key={service.id} service={service} />
              ))}
            </div>
          </div>

          <BarbershopDetailsContact phones={barbershop.phones} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
