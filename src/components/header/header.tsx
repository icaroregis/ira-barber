import HeaderMobile from "./header-mobile";
import HeaderDesktop from "./header-desktop";
import { ResponsiveLayout } from "@/components/responsive-layout";

export default function Header() {
  return (
    <ResponsiveLayout mobile={<HeaderMobile />} desktop={<HeaderDesktop />} />
  );
}
