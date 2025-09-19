import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { supabase } from './lib/supabaseClient';
import { dailyCleanupIfNeeded } from './db/cleanup.ts';
import SEO from './components/SEO/SEO.tsx';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import ProductInfoSection from './components/BurgerShopInfoSection/BurgerShopInfoSection.tsx';
import Footer from './components/Footer/Footer';
import ScrollTop from './components/ScrollTop/ScrollTop';
import ScrollToTopOnRouteChange from './components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange';
import Cart from './components/Cart/Cart';
import PoliticaEPrivacidade from './pages/PoliticasEPrivacidade';
import MenuPage from './components/MenuSection/Menupage.tsx';
import HorioAlert from './components/HorarioAlert/HorarioAlert.tsx';
import AboutUs from './pages/AboutUs.tsx';
import OrdersPanel from './pages/OrdersPanel.tsx';
import Aos from 'aos';

export default function AppContent() {
  const { items, total, isCartOpen, openCart, closeCart } = useCart();

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
    dailyCleanupIfNeeded();
    async function testConnection() {
      const { data, error } = await supabase.from('pedidos').select('*').limit(1);
      if (error) {
        console.error('Erro ao conectar Supabase ❌:', error.message);
      } else {
        console.log('Conexão Supabase OK ✅', data);
      }
    }

    testConnection();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 max-w-7xl mx-auto w-full">
      <Header onCartClick={openCart} cartItemCount={items.length} />
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
                <HorioAlert />
                <Hero />
                <MenuPage />
                <ProductInfoSection />
              </main>
            </>
          }
        />
        <Route path="/politicas" element={<PoliticaEPrivacidade />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/orders" element={<OrdersPanel />} />
      </Routes>

      <Footer />

      <Cart
        isOpen={isCartOpen}
        onClose={closeCart}
        key={`${items.length}-${total.toFixed(2)}`}
      />
    </div>
  );
}
