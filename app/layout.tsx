
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mundo Encantado',
  description: 'Personagens vivos e recreação infantil',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className="bg-slate-950">{children}</body>
    </html>
  );
}
