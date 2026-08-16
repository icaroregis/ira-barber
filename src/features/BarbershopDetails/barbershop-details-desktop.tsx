import { Barbershop, BarbershopServices } from "@/app/_generated/prisma/client";
import { BarbershopDetailsHeader } from "./components/barbershop-details-header";
import { BarbershopDetailsInfo } from "./components/barbershop-details-info";
import { BarbershopDetailsDescription } from "./components/barbershop-details-description";
import { ServiceItem } from "./components/service-item";
import { BarbershopDetailsContact } from "./components/barbershop-details-contact";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

interface BarbershopDetailsDesktopProps {
  barbershop: Barbershop & {
    services: BarbershopServices[];
  };
}

export default function BarbershopDetailsDesktop({
  barbershop,
}: BarbershopDetailsDesktopProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[#141518]">
      <Header />

      <main className="flex-1">
        {/* No desktop o Header da barbearia pode ser diferente ou ter container */}
        <BarbershopDetailsHeader
          imageUrl={barbershop.imageUrl}
          name={barbershop.name}
        />

        <div className="mx-auto max-w-[1440px] px-32 py-10">
          <div className="grid grid-cols-[1fr_400px] gap-10">
            <div className="flex flex-col gap-10">
              <BarbershopDetailsInfo
                name={barbershop.name}
                address={barbershop.address}
              />

              <BarbershopDetailsDescription
                description={barbershop.description}
              />

              <div className="flex flex-col gap-3">
                <h2 className="text-xs font-bold text-[#838896] uppercase">
                  Serviços
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {barbershop.services.map((service) => (
                    <ServiceItem key={service.id} service={service} />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <BarbershopDetailsContact phones={barbershop.phones} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
