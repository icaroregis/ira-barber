import { ReactNode } from "react";

interface ResponsiveLayoutProps {
  mobile: ReactNode;
  desktop: ReactNode;
}

export function ResponsiveLayout({ mobile, desktop }: ResponsiveLayoutProps) {
  return (
    <>
      <div className="block lg:hidden">{mobile}</div>
      <div className="hidden lg:block">{desktop}</div>
    </>
  );
}
