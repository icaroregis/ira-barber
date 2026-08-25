import { db } from "@/lib/prisma";
import HomeMobile from "./home-mobile";
import HomeDesktop from "./home-desktop";
import { ResponsiveLayout } from "@/components/responsive-layout";

export default async function Home() {
  const barbershops = await db.barbershop.findMany();
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <ResponsiveLayout
      mobile={
        <div className="flex flex-1 flex-col">
          <HomeMobile
            barbershops={barbershops}
            popularBarbershops={popularBarbershops}
          />
        </div>
      }
      desktop={
        <div className="flex flex-1 flex-col">
          <HomeDesktop
            barbershops={barbershops}
            popularBarbershops={popularBarbershops}
          />
        </div>
      }
    />
  );
}
