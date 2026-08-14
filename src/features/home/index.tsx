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
      <div className="block lg:hidden">
        <HomeMobile
          barbershops={barbershops}
          popularBarbershops={popularBarbershops}
        />
      </div>
      <div className="hidden lg:block">
        <HomeDesktop />
      </div>
    </>
  );
}
