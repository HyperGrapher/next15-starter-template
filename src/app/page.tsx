import { cn } from "src/lib/utils";
import { LandingPage } from "src/components/Landing";


export default async function HomePage() {

  return (
    <main className={cn("flex min-h-screen flex-col items-center pt-6")}>
      <LandingPage />
    </main>
  );
}
