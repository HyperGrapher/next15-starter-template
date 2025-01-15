'use client';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="flex flex-col xmin-h-[100dvh]">
      {children}
    </section>
  );
}