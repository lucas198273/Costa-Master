import React from "react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const SocialMediaSection: React.FC = () => {
  return (
    <>
      <Helmet>
        {/* Importa fonte de destaque, se necessário */}
        <link
          href="https://fonts.googleapis.com/css2?family=Bangers&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <section className="py-12 px-4 bg-[#0a0a1a] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <img
            src="/himgs/logo.webp"
            alt="Hamburgueria Logo"
            className="mx-auto mb-6 w-36 h-36 object-cover rounded-full border-4 border-green-400 shadow-xl"
          />

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-400 drop-shadow-md">
            The Brothers Hamburgueria
          </h2>

          <p className="mb-6 text-lg italic text-gray-300">
            
            Siga nossas redes sociais e fique por dentro de promoções, novidades e nossos lanches exclusivos.
          </p>

          <div className="flex justify-center gap-8 flex-wrap">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/thebrothersbetim/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110 text-green-500 hover:text-green-300"
            >
              <FaInstagram className="w-10 h-10 mb-2" />
              <span className="text-sm font-medium">Instagram</span>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/5531999918730"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center transition-transform hover:scale-110 text-green-500 hover:text-green-300"
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
