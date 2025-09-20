import { FaInstagram, FaWhatsapp } from "react-icons/fa";

const colors = {
  amarelo: "#FFD700", // fundo
  azul: "#043741",    // destaque/hover
  preto: "#000000",   // texto
};

export default function Footer() {
  return (
    <footer className="py-8 px-4 mt-10" style={{ backgroundColor: colors.amarelo }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Nome da loja */}
        <h2
          className="text-xl font-bold mb-4 md:mb-0"
          style={{ color: colors.preto, textShadow: "1px 1px 2px rgba(0,0,0,0.3)" }}
        >
          Bicicletas Costa
        </h2>

        {/* Ícones de redes sociais */}
        <div className="flex space-x-6 text-2xl">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/bikestore/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            style={{ color: colors.azul }}
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <FaInstagram />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5531999999999"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            style={{ color: colors.azul }}
            className="hover:opacity-80 transition-opacity duration-300"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Direitos autorais */}
      <div className="text-center text-sm mt-6" style={{ color: colors.preto, opacity: 0.7 }}>
        © {new Date().getFullYear()}{" "}
        <span style={{ color: colors.azul, fontWeight: "600" }}>
          Bicicletas Costa
        </span>
        . Todos os direitos reservados.
      </div>
    </footer>
  );
}
