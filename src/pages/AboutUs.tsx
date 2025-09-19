import React from "react";
import SocialMediaSection from "../components/SocialMidia/SocialMIdia";

const AboutUs: React.FC = () => {
  const whatsappMessage = "Olá! 😊 Gostaria de saber mais sobre a hamburgueria e pedidos.";
  const whatsappLink = `https://wa.me/5531999999999?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="bg-white text-gray-900 min-h-screen py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mt-10">
        
        {/* Imagem */}
        <div className="md:w-1/2">
          <img
            src="/himgs/image.png"
            alt="Hamburguer artesanal"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Conteúdo */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 drop-shadow-md">
            Sobre a The Brothers
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed">
            Fundada com paixão por hambúrgueres artesanais, a The Brothers é mais que uma hamburgueria: é uma experiência gastronômica. Cada receita é cuidadosamente preparada com ingredientes frescos e selecionados, garantindo sabor e qualidade em cada mordida.
          </p>

          <p className="text-lg text-gray-700 leading-relaxed">
            Nosso objetivo é criar um ambiente acolhedor, onde amigos e famílias possam se reunir e desfrutar de momentos inesquecíveis. Valorizamos a tradição do hambúrguer artesanal, mas sempre com inovação e criatividade no cardápio.
          </p>

          <h2 className="text-2xl font-semibold text-green-600">Nossa Missão</h2>
          <p className="text-gray-700 leading-relaxed">
            Proporcionar uma experiência única aos nossos clientes, combinando sabor, qualidade e atendimento excepcional.
          </p>

          <h2 className="text-2xl font-semibold text-green-600">Nossos Valores</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Qualidade e frescor dos ingredientes</li>
            <li>Atendimento cordial e eficiente</li>
            <li>Inovação e criatividade no cardápio</li>
            <li>Ambiente acolhedor e seguro</li>
          </ul>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
          >
            Fale Conosco
          </a>
        </div>
      </div>
      
      <SocialMediaSection />
    </section>
  );
};

export default AboutUs;
