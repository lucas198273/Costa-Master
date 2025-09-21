"use client";

import { ShieldCheck, AlertTriangle } from "lucide-react";

export default function GarantiaBicicletas() {
  const colors = {
    amarelo: "#FFD700",
    azul: "#043741",
    branco: "#FFFFFF",
    preto: "#000000",
  };

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <div
        className="shadow-lg rounded-2xl border p-6"
        style={{ backgroundColor: colors.branco, borderColor: colors.azul }}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-6">
          <ShieldCheck className="h-10 w-10" style={{ color: colors.azul }} />
          <h2
            className="text-2xl font-bold text-center"
            style={{ color: colors.azul }}
          >
            Garantia das Bicicletas
          </h2>
        </div>

        {/* Conteúdo */}
        <div className="space-y-4 leading-relaxed" style={{ color: colors.preto }}>
          <p>
            Todas as bicicletas vendidas em nossa loja possuem{" "}
            <span style={{ fontWeight: "bold", color: colors.azul }}>
              garantia de 30 dias
            </span>{" "}
            a partir da data da compra.
          </p>

          {/* Alerta */}
          <div
            className="flex items-start gap-3 p-4 rounded-lg border"
            style={{
              backgroundColor: `${colors.amarelo}20`, // amarelo suave
              borderColor: colors.amarelo,
            }}
          >
            <AlertTriangle
              className="h-6 w-6 mt-1"
              style={{ color: colors.amarelo }}
            />
            <p>
              A garantia{" "}
              <span style={{ fontWeight: "bold", color: colors.preto }}>
                não cobre
              </span>{" "}
              desgaste natural de peças, como pneus, correntes, cabos, freios ou
              outros componentes sujeitos ao uso diário.
            </p>
          </div>

          <p>
            Em caso de defeito de fabricação ou problema estrutural, entre em
            contato com nossa equipe para solicitar o atendimento de garantia.
          </p>
        </div>
      </div>
    </section>
  );
}
