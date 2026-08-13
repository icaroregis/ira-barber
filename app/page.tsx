import Header from "./components/header/header";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="p-5">
        <Button>Hello World</Button>
      </div>
    </div>
  );
}
