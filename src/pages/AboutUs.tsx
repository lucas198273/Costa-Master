import React from "react";
import SocialMediaSection from "../components/SocialMidia/SocialMIdia";

const AboutUs: React.FC = () => {
  const whatsappMessage = "Olá! Gostaria de saber mais sobre a Bicicletas Costa do Comércio e pedidos.";
  const whatsappLink = `https://wa.me/5531999999999?text=${encodeURIComponent(whatsappMessage)}`;

  const colors = {
    amarelo: "#FFD700",
    azul: "#043741",
    preto: "#000000",
    branco: "#FFFFFF",
  };


  return (
    <section className="min-h-screen py-16 px-4" style={{ backgroundColor: colors.branco, color: colors.preto }}>
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 mt-10">

        {/* Imagem */}
          <div className="md:w-1/2 p-6 flex justify-center items-center">
            <img
              src="/himgs/1.jpg"
              alt="Bicicletas Costa"
              className="w-full max-w-md h-auto rounded-lg shadow-lg object-cover"
              style={{ aspectRatio: '16/9' }}
              loading="lazy"
            />
          </div>

        {/* Conteúdo */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold drop-shadow-md mt-2"
              style={{ color: colors.azul, fontFamily: "'Playfair Display', serif" }}>
            Sobre a Bicicletas Costa
          </h1>

          <p className="text-lg leading-relaxed" style={{ color: colors.preto }}>
            Fundada com paixão por bicicletas de qualidade, a Bicicletas Costa oferece produtos selecionados e atendimento personalizado. Cada bicicleta é escolhida pensando em desempenho, segurança e conforto.
          </p>

          <p className="text-lg leading-relaxed" style={{ color: colors.preto }}>
            Nosso objetivo é criar uma experiência única para ciclistas de todos os níveis, oferecendo orientação especializada e um ambiente acolhedor para conhecer e testar nossos produtos.
          </p>

          <h2 className="text-2xl font-semibold" style={{ color: colors.azul }}>Nossa Missão</h2>
          <p className="leading-relaxed" style={{ color: colors.preto }}>
            Proporcionar a melhor experiência em bicicletas, combinando qualidade, atendimento personalizado e confiança.
          </p>

          <h2 className="text-2xl font-semibold" style={{ color: colors.azul }}>Nossos Valores</h2>
          <ul className="list-disc list-inside space-y-1" style={{ color: colors.preto }}>
            <li>Qualidade e segurança das bicicletas</li>
            <li>Atendimento cordial e especializado</li>
            <li>Transparência e confiança em todos os processos</li>
            <li>Ambiente acolhedor e inspirador para ciclistas</li>
          </ul>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer"
             className="inline-block mt-4 mb-7 px-6 py-3 font-semibold rounded-lg transition text-center"
             style={{ backgroundColor: colors.azul, color: colors.amarelo }}>
            Fale Conosco
          </a>
        </div>
      </div>

      <SocialMediaSection />
    </section>
  );
};

export default AboutUs;
