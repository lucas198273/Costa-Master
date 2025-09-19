import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react"; // ou outro ícone que preferir

const ScrollTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg "
      aria-label="Voltar ao topo"
    >
      <ArrowUp size={38} className="bg-green-300 rounded-full" />
    </button>
  );
};

export default ScrollTop;
