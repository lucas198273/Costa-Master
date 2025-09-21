"use client";

import { ShieldCheck, BadgeCheck, Smile } from "lucide-react";

export default function InfoLoja() {
  const colors = {
    amarelo: "#FFD700",
    azul: "#043741",
    branco: "#FFFFFF",
    preto: "#000000",
  };

  return (
    <section
      className="w-full py-6"
      style={{ backgroundColor: colors.branco, color: colors.preto, borderColor: colors.azul, borderTopWidth: '4px', borderBottomWidth: '4px' }}
    >
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Garantias */}
        <div className="flex flex-wrap justify-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <Smile className="h-6 w-6" style={{ color: colors.amarelo }} />
            <span className="text-sm font-medium">Satisfação Garantida</span>
          </div>
          <div className="flex items-center gap-2">
            <BadgeCheck className="h-6 w-6" style={{ color: colors.amarelo }} />
            <span className="text-sm font-medium">Autenticidade das Peças</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-6 w-6" style={{ color: colors.amarelo }} />
            <span className="text-sm font-medium">Garantia 30 Dias</span>
          </div>
        </div>

        {/* Informações da Loja */}
        <p className="text-xs text-center md:text-right leading-relaxed max-w-sm">
          Loja de Bicicletas fundada em <span className="font-semibold">2015</span>, 
          localizada na Rua Exemplo, 123 - Centro. Nosso compromisso é com a qualidade, 
          confiança e o melhor atendimento.
        </p>
      </div>
    </section>
  );
}
