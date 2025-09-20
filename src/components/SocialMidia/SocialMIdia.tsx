import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const colors = {
  amarelo: "#FFD700", // fundo
  azul: "#043741",    // destaque/hover
  preto: "#000000",   // texto
  branco: "#FFFFFF", // não usado
};

const SocialMediaSection: React.FC = () => {
  return (
    <>
      <Helmet>
        {/* Fonte de destaque opcional */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <section
        className="py-12 px-4"
        style={{ backgroundColor: colors.azul, color: colors.preto }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo da loja */}
          <img
            src="/himgs/logo.webp"
            alt="Bicicletas Costa"
            className="mx-auto mb-6 w-36 h-36 object-cover rounded-full border-4"
            style={{ borderColor: colors.azul }}
          />

          {/* Nome da loja */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: colors.amarelo, fontFamily: "'Bangers', cursive", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
          >
            Bicicletas Costa
          </h2>

          {/* Descrição */}
          <p className="mb-6 text-lg italic" style={{ color: colors.branco }}>
            Siga nossas redes sociais e fique por dentro de promoções, novidades e nossas bicicletas exclusivas.
          </p>

          {/* Ícones sociais */}
          <div className="flex justify-center gap-8 flex-wrap">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/bikestore/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110"
              style={{ color: colors.amarelo }}
            >
              <FaInstagram className="w-10 h-10 mb-2" />
              <span className="text-sm font-medium">{`Instagram`}</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5531999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110"
              style={{ color: colors.amarelo }}
            >
              <FaWhatsapp className="w-10 h-10 mb-2" />
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default SocialMediaSection;
