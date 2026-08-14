import HomeMobile from "./home-mobile";
import HomeDesktop from "./home-desktop";
import { db } from "@/lib/prisma";

export default async function Home() {
  const barbershops = await db.barbershop.findMany();

  return (
    <>
      <div className="block lg:hidden">
        <HomeMobile barbershops={barbershops} />
      </div>
      <div className="hidden lg:block">
        <HomeDesktop />
      </div>
    </>
  );
}
