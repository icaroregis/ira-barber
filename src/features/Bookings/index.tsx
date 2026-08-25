import BookingsMobile from "./bookings-mobile";
import { ResponsiveLayout } from "@/components/responsive-layout";

export default async function Bookings() {
  return (
    <ResponsiveLayout
      mobile={<BookingsMobile />}
      desktop={
        <div className="mx-auto min-h-screen max-w-[500px] border-x border-[#26272B]">
          <BookingsMobile />
        </div>
      }
    />
  );
}
