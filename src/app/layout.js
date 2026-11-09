import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/global.css';
import '@/styles/sections.css';

export const metadata = {
  title: 'Yerson - Profile',
  description:
    'Portafolio de Yerson: Python, APIs y herramientas para construir nuevas ideas.',
  icons: { icon: '/assets/svg/avatar.svg' },
};

export const viewport = { themeColor: '#120e20' };

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <a className="skip-link" href="#inicio">
          Ir al contenido
        </a>
        <Header />
        <main>{children}</main>
        <div className="content-frame content-frame--end">
          <Footer />
        </div>
      </body>
    </html>
  );
}
