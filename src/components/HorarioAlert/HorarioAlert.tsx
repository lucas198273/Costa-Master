import { useState, useEffect } from "react";
import { horarioFuncionamento, verificarHorarioAtual } from "../../utils/horarios";

const HorarioAlert: React.FC = () => {
  const [aberto, setAberto] = useState(true);
  const [mensagem, setMensagem] = useState("");
  const [verHorario, setVerHorario] = useState(false);

  useEffect(() => {
    const status = verificarHorarioAtual();
    setAberto(status.aberto);
    setMensagem(status.mensagem);
  }, []);

  return (
    <>
      {/* ALERTA FIXO NO TOPO */}
      <div
        className={`w-full p-4 text-white flex justify-between items-center ${
          aberto ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <span>{mensagem}</span>
        {!aberto && (
          <button
            onClick={() => setVerHorario(true)}
            className="ml-4 px-3 py-1 bg-white text-green-700 rounded hover:bg-gray-200 transition"
          >
            Visualizar Horários
          </button>
        )}
      </div>

      {/* MODAL DE HORÁRIOS */}
     {verHorario && (
  <div className="fixed inset-0 bg-[rgba(0,0,0,0.85)] flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative animate-fadeIn">
      
      {/* CABEÇALHO */}
      <div className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-green-700">
          Horário de Funcionamento
        </h2>
        <button
          onClick={() => setVerHorario(false)}
          className="text-gray-400 hover:text-gray-700 transition-colors text-3xl font-bold"
          aria-label="Fechar modal"
        >
          ×
        </button>
      </div>

      {/* CONTEÚDO */}
      <div className="px-6 py-4">
        <table className="w-full border-collapse">
          <tbody>
            {horarioFuncionamento.map((dia, idx) => (
              <tr
                key={dia.dia}
                className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-3 px-4 font-medium text-gray-700">{dia.dia}</td>
                <td className="py-3 px-4 text-gray-600">
                  {dia.abertura ? `${dia.abertura} - ${dia.fechamento}` : "Fechado"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* RODAPÉ */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <button
          onClick={() => setVerHorario(false)}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default HorarioAlert;
