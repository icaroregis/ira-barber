import HomeMobile from "./home-mobile";
import HomeDesktop from "./home-desktop";
import { db } from "@/lib/prisma";

export default async function Home() {
  const barbershops = await db.barbershop.findMany();
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <>
      <div className="flex flex-1 flex-col lg:hidden">
        <HomeMobile
          barbershops={barbershops}
          popularBarbershops={popularBarbershops}
        />
      </div>
      <div className="hidden flex-1 flex-col lg:flex">
        <HomeDesktop
          barbershops={barbershops}
          popularBarbershops={popularBarbershops}
        />
      </div>
    </>
  );
}
