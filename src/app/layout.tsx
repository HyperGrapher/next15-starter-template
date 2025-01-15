import { Toaster } from "src/components/ui/toaster";
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { Metadata, Viewport } from 'next';
import { Manrope } from 'next/font/google';
import { UserProvider } from 'src/server/auth';
import { getUser } from 'src/server/db/queries';
import "src/styles/globals.css";
import { Topbar } from "src/components/Topbar";

export const metadata: Metadata = {
  title: 'Next.js SaaS Starter',
  description: 'Get started quickly with Next.js',
};


export const viewport: Viewport = {
  maximumScale: 1,
};

const manrope = Manrope({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  let userPromise = getUser();

  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${manrope.className} dark`}>
      <body className="min-h-[100dvh]">
        <UserProvider userPromise={userPromise}>
          <NextIntlClientProvider messages={messages}>
            <Topbar />
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </UserProvider>
      </body>
    </html>
  );
}
