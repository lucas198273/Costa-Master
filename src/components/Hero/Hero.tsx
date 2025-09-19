"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroBike() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-12 md:py-20">
      {/* Fundo */}
      <div className="absolute inset-0 bg-[url('/himgs/bg.jpg')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Conteúdo */}
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full max-w-7xl gap-6 md:gap-20 px-6 text-center md:text-left">
        {/* Texto e CTA */}
        <div data-aos="fade-right" className="w-full md:w-1/2">
          <h1 className="text-4xl sm:text-5xl md:text-8xl font-extrabold mb-6 leading-tight tracking-tight text-white drop-shadow-lg">
            Descubra sua <br />
            <span className="text-yellow-400">Bike Perfeita 🚴</span>
          </h1>

          <p className="text-white/90 text-lg sm:text-xl md:text-2xl font-light mb-8 max-w-xl mx-auto md:mx-0">
            A maior variedade de bicicletas e acessórios, tudo em um só lugar. Venha conhecer nossa loja e nossa equipe!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-start">
            <button className="bg-yellow-400 text-black font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl shadow-lg hover:bg-yellow-500 transition duration-300 text-lg md:text-xl">
              Conheça nossas bikes
            </button>

            <button className="border-2 border-yellow-400 text-yellow-400 font-semibold px-6 sm:px-10 py-3 sm:py-4 rounded-xl hover:bg-yellow-400 hover:text-black transition duration-300 text-lg md:text-xl">
              Contato
            </button>
          </div>
        </div>

        {/* Imagem única */}
        <div data-aos="fade-left" className="w-full md:w-1/2 flex justify-center">
          <img
            src="/himgs/image.jpg"
            alt="Fachada da loja"
            className="w-full max-h-[270px] sm:max-h-[350px] md:max-h-[400px] rounded-2xl shadow-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}
