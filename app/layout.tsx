import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { GithubIcon } from "@/components/icons";
import { publicUrl, site } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${site.name} · ${site.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(publicUrl),
  title: { default: title, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: site.keywords,
  authors: [{ name: site.ownerName }],
  creator: site.ownerName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

const navLink =
  "rounded-lg px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-2 focus-visible:outline-violet-500 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a
          href="#contenido"
          className="sr-only z-50 rounded-lg bg-violet-600 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Saltar al contenido
        </a>

        <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/80 backdrop-blur-md dark:border-zinc-800/70 dark:bg-zinc-950/80">
          <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5 font-semibold text-zinc-900 dark:text-white">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-sm font-bold text-white">
                AC
              </span>
              <span>{site.name}</span>
            </Link>
            <nav aria-label="Principal" className="flex items-center gap-1">
              <div className="hidden items-center gap-1 md:flex">
                <Link href="/#conectar" className={navLink}>
                  Conectar
                </Link>
                <Link href="/#funciones" className={navLink}>
                  Funciones
                </Link>
                <Link href="/#seguridad" className={navLink}>
                  Seguridad
                </Link>
                <Link href="/#preguntas" className={navLink}>
                  Preguntas
                </Link>
              </div>
              <Link
                href="/#conectar"
                className="rounded-lg bg-violet-600 px-3 py-1.5 text-sm font-medium text-white transition-all hover:bg-violet-500 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-500 md:hidden"
              >
                Conectar
              </Link>
              <a href={site.repoUrl} className={navLink} aria-label="Código fuente en GitHub">
                <GithubIcon className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </header>

        <div id="contenido" className="flex flex-1 flex-col">
          {children}
        </div>

        <footer className="border-t border-zinc-200 dark:border-zinc-800">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-zinc-500 sm:px-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-md">
              <p className="font-medium text-zinc-700 dark:text-zinc-300">{site.name}</p>
              <p className="mt-1">
                Servicio independiente, no afiliado ni respaldado por ActiveCollab. ActiveCollab es una marca de su
                respectivo propietario.
              </p>
            </div>
            <nav aria-label="Pie de página" className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/privacidad" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
                Privacidad
              </Link>
              <Link href="/terminos" className="transition-colors hover:text-zinc-900 dark:hover:text-white">
                Términos
              </Link>
              <a href={site.repoUrl} className="transition-colors hover:text-zinc-900 dark:hover:text-white">
                Código fuente
              </a>
              <a href={`mailto:${site.contactEmail}`} className="transition-colors hover:text-zinc-900 dark:hover:text-white">
                Contacto
              </a>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
