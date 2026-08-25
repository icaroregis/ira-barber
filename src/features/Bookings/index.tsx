import BookingsMobile from "./bookings-mobile";
import BookingsDesktop from "./bookings-desktop";

export default async function Bookings() {
  return (
    <>
      <div className="block lg:hidden">
        <BookingsMobile />
      </div>
      <div className="hidden lg:block">
        <BookingsDesktop />
      </div>
    </>
  );
}
