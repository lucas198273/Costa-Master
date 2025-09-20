"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-20"
      aria-label="Seção principal de bicicletas Costa do Comércio"
    >
      {/* Fundo */}
      <div className="absolute inset-0 bg-[url('/himgs/bg.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-7xl gap-6 md:gap-20 px-6 text-center md:text-left">
        
        {/* Texto e CTA */}
        <div data-aos="fade-right" className="w-full md:w-1/2">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
            Encontre a sua <br />
            <span className="text-yellow-400">Bicicleta Ideal</span>
          </h1>

          <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light mb-6 max-w-xl mx-auto md:mx-0">
            Na <strong>Bicicletas Costa</strong>, você encontra uma seleção completa de bicicletas, acessórios e serviços personalizados. Equipamentos confiáveis, modelos de alta qualidade e atendimento especializado para todos os ciclistas.
          </p>

          {/* Selos de segurança */}
          <div className="flex justify-center md:justify-start gap-4 mb-8">
            <img
              src="/himgs/selo.png"
              alt="Compra 100% segura"
              className="w-32 h-auto object-contain"
            />
           
          </div>

     

        </div>

        {/* Imagem */}
        <div data-aos="fade-left" className="w-full md:w-1/2 flex justify-center">
          <img
            src="/himgs/image.jpg"
            alt="Fachada da loja Bicicletas Costa do Comércio"
            className="w-full max-h-[380px] sm:max-h-[380px] md:max-h-[400px] rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
