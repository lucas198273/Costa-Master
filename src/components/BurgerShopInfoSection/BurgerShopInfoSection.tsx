import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./BurgerShopInfoSection.module.css";

const BurgerShopInfoSection: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // duração da animação
      easing: "ease-in-out", // suavidade
      once: true, // só anima uma vez
      mirror: false, // não repete ao rolar de volta
    });
  }, []);

  const linkWhatsApp = `https://wa.me/5531990639998?text=${encodeURIComponent(
    "Olá! 😊 Gostaria de fazer um pedido ou tirar dúvidas sobre o cardápio."
  )}`;

  const cards = [
    {
      title: "Qualidade e Sabor",
      description:
        "Nossos hambúrgueres são preparados com ingredientes frescos e selecionados, garantindo sabor e qualidade em cada mordida.",
    },
    {
      title: "Pedidos e Atendimento",
      description:
        "Atendemos via WhatsApp e presencialmente, sempre com atenção e rapidez. Tire dúvidas, peça recomendações ou faça seu pedido direto pelo chat.",
      link: linkWhatsApp,
      linkText: "Peça pelo WhatsApp",
    },
  ];

  return (
    <section
      className={`${styles.sectionBackground}  relative py-16 px-4 text-white`}
    ><div className="bg-[rgba(0,0,0,0.6)] w-full  h-full  top-0 left-0">
      <div className={styles.overlay}></div>
      <div className="relative max-w-4xl mx-auto text-center z-10">
        {/* TÍTULO */}
        <h2
          className="text-4xl md:text-5xl font-bold mb-8 text-white drop-shadow-md"
          data-aos="fade-down"
          data-aos-delay={100}
        >
          Sobre Nossa Hamburgueria
        </h2>

        {/* TEXTO */}
        <p
          className="text-lg md:text-xl mb-12 italic leading-relaxed text-white/90"
          data-aos="fade-up"
          data-aos-delay={200}
        >
          Na nossa hamburgueria, cada lanche é preparado com carinho. Valorizamos a
          qualidade, o sabor e a experiência do cliente, seja no atendimento presencial
          ou no pedido online.
        </p>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-lg shadow-2xl border border-red-600 bg-black/70 text-white transform transition-transform hover:-translate-y-2 hover:shadow-red-700/50"
              data-aos="fade-up"
              data-aos-delay={300 + idx * 150}
            >
              <h3 className="text-2xl font-semibold mb-4 text-red-600">{card.title}</h3>
              <p className="text-base mb-4">{card.description}</p>
              {card.link && (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-6 py-3 rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition-colors"
                >
                  {card.linkText}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* TEXTO FINAL */}
        <p
          className="text-lg md:text-xl font-bold text-white drop-shadow-md"
          data-aos="fade-up"
          data-aos-delay={500}
        >
          Sabor e qualidade em cada mordida!
        </p>
      </div>
      </div>
    </section>
  );
};

export default BurgerShopInfoSection;
