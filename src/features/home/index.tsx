import HomeMobile from "./home-mobile";
import HomeDesktop from "./home-desktop";

export default function Home() {
  return (
    <>
      <div className="block lg:hidden">
        <HomeMobile />
      </div>
      <div className="hidden lg:block">
        <HomeDesktop />
      </div>
    </>
  );
}
