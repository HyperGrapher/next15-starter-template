import Link from "next/link";
import { Button } from "src/components/ui/button";
import { db } from "src/server/db";
import { cn } from "src/lib/utils";
import TempAuthComp from "src/components/TempAuthComp";
import { LocaleSelector } from "src/components/LocaleSelector";
import { TempUsers } from "src/components/TempUsers";
import { LandingPage } from "src/components/Landing";


export default async function HomePage() {

  const users = await db.user.findMany();


  return (
    <main className={cn("flex min-h-screen flex-col items-center pt-6")}>
      {/* <LocaleSelector />
      <TempAuthComp />
      <TempUsers users={users} /> */}
      <LandingPage />
    </main>
  );
}
