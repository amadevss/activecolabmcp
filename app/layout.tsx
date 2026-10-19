import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.name,
  description: "Conecta Claude con tu cuenta de ActiveCollab: proyectos, tareas, horas y más desde el chat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="mx-auto w-full max-w-2xl px-4 pb-10 text-sm text-zinc-500">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/" className="hover:underline">
              Inicio
            </Link>
            <Link href="/privacidad" className="hover:underline">
              Privacidad
            </Link>
            <Link href="/terminos" className="hover:underline">
              Términos
            </Link>
            <a href={site.repoUrl} className="hover:underline">
              Código fuente
            </a>
            <a href={`mailto:${site.contactEmail}`} className="hover:underline">
              Contacto
            </a>
          </nav>
          <p className="mt-3">
            Servicio independiente, no afiliado ni respaldado por ActiveCollab. ActiveCollab es una marca de su
            respectivo propietario.
          </p>
        </footer>
      </body>
    </html>
  );
}
