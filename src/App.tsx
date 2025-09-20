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
import MenuPage from './components/MenuSection/Menupage.tsx';
import AboutUs from './pages/AboutUs.tsx';
import PaymentInfo from './components/PaymentInfo/PaymentInfo.tsx';
import Aos from 'aos';

export default function AppContent() {
  const { } = useCart();

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
 

  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 max-w-7xl mx-auto w-full">
      <Header  />
      <ScrollToTopOnRouteChange />
      <ScrollTop />

      <Routes>
        <Route
          path="/"
          element={
            <>
              <SEO
                title="The Brothers Burgers"
                description="Hamburgueria artesanal localizada na Rua do Rosário 1091, Betim, MG. Oferecemos hambúrgueres artesanais deliciosos em um ambiente acolhedor."
                image="URL_da_imagem_do_seu_logo_ou_foto_do_local.jpg"
                url="https://www.thebrothersburgersbetim.com"
              />
              <main className="pt-20 flex flex-col w-full">
                <Hero />
                <MenuPage />
                <PaymentInfo />
              </main>
            </>
          }
        />
        <Route path="/politicas" element={<PoliticaEPrivacidade />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      <Footer />

    
    </div>
  );
}
