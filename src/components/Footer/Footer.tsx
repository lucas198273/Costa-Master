import { FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-8 px-4 mt-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Nome da Hamburgueria */}
        <h2 className="text-xl font-bold mb-4 md:mb-0 drop-shadow-md text-red-600">
          The Brothers Hamburgueria
        </h2>

        {/* Ícones */}
        <div className="flex space-x-6 text-2xl">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/thebrothersbetim/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-400 transition-colors duration-300"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5531999918730"
            target="_blank"
            rel="noopener noreferrer"
            className="text-red-600 hover:text-red-400 transition-colors duration-300"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* Direitos autorais */}
      <div className="text-center text-sm mt-6 text-white/70">
        © {new Date().getFullYear()}{" "}
        <span className="text-red-600 font-semibold">The Brothers Hamburgueria</span>. 
        Todos os direitos reservados.
      </div>
    </footer>
  );
}
