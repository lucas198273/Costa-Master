import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import SEO from './components/SEO/SEO.tsx';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Footer from './components/Footer/Footer';
import ScrollTop from './components/ScrollTop/ScrollTop';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange';
import PoliticaEPrivacidade from './pages/PoliticasEPrivacidade';
import Contato from './pages/Contato';
import MenuPage from './components/MenuSection/Menupage.tsx';
import AboutUs from './pages/AboutUs.tsx';
import PaymentInfo from './components/PaymentInfo/PaymentInfo';
import GarantiaBicicletas from './components/GarantiaBicicletas/GarantiaBicicletas.tsx';
import InfoLoja from './components/InfoLoja/InfoLoja.tsx';
import StatusLoja from './components/StatusLoja/StatusLoja.tsx';
import Aos from 'aos';

export default function AppContent() {
  const { } = useCart();

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 max-w-7xl mx-auto w-full">
      <Header />
      <ScrollToTopOnRouteChange />
      <ScrollTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SEO
                title="Bicicletas Costa | Loja de Bicicletas em Ibirité"
                description="Bicicletas Costa: loja de bicicletas em Ibirité, MG. Vendemos bicicletas de qualidade, manutenção especializada e acessórios para todos os ciclistas."
                image="URL_da_imagem_do_logo_ou_loja.jpg"
                url="https://www.bicicletascosta.com.br"
              />
              <main className="pt-20 flex flex-col w-full">
                <Hero />
                <InfoLoja />
                <StatusLoja />
                <MenuPage />
                <PaymentInfo />
                <GarantiaBicicletas />
              </main>
            </>
          }
        />
        <Route path="/politicas" element={<PoliticaEPrivacidade />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contato" element={<Contato />} />
      </Routes>

      <Footer />
    </div>
  );
}
