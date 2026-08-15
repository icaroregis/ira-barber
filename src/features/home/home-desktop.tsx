import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";

export default function HomeDesktop() {
  return (
    <div>
      {/* HEADER */}
      <Header />

      <div className="flex min-h-[50vh] flex-col items-center justify-center">
        <h1 className="text-muted-foreground text-2xl font-bold">
          Em construção
        </h1>
        <p className="text-muted-foreground">
          O layout desktop será implementado em breve.
        </p>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}
