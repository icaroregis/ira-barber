import HeaderMobile from "./header-mobile";
import HeaderDesktop from "./header-desktop";

export default function Header() {
  return (
    <>
      <div className="block lg:hidden">
        <HeaderMobile />
      </div>
      <div className="hidden lg:block">
        <HeaderDesktop />
      </div>
    </>
  );
}
