export type HorarioDia = {
  dia: string;
  abertura: string | null; // null significa fechado
  fechamento: string | null;
};

export const horarioFuncionamento: HorarioDia[] = [
  { dia: "Segunda-feira", abertura: "10:00", fechamento: "03:00" },
  { dia: "Terça-feira", abertura: null, fechamento: null },
  { dia: "Quarta-feira", abertura: "18:00", fechamento: "03:00" },
  { dia: "Quinta-feira", abertura: "18:00", fechamento: "03:00" },
  { dia: "Sexta-feira", abertura: "18:00", fechamento: "03:00" },
  { dia: "Sábado", abertura: "10:00", fechamento: "03:00" },
  { dia: "Domingo", abertura: "18:00", fechamento: "03:00" },
];

export function verificarHorarioAtual(): { aberto: boolean; mensagem: string } {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0 = Domingo, 1 = Segunda, ...
  const horario = horarioFuncionamento[diaSemana === 0 ? 6 : diaSemana - 1]; // ajustar índice

  if (!horario.abertura || !horario.fechamento) {
    return { aberto: false, mensagem: `Fechado hoje` };
  }

  const [horaA, minA] = horario.abertura.split(":").map(Number);
  const [horaF, minF] = horario.fechamento.split(":").map(Number);

  const abertura = new Date();
  abertura.setHours(horaA, minA, 0);

  const fechamento = new Date();
  // Caso o fechamento seja depois da meia-noite
  if (horaF < horaA) {
    fechamento.setDate(fechamento.getDate() + 1);
  }
  fechamento.setHours(horaF, minF, 0);

  if (agora >= abertura && agora <= fechamento) {
    return { aberto: true, mensagem: `Aberto agora!` };
  }

  // calcular tempo até abrir
  let proximaAbertura = new Date();
  proximaAbertura.setHours(horaA, minA, 0);
  if (agora > fechamento) {
    // vai abrir no próximo dia útil
    proximaAbertura.setDate(proximaAbertura.getDate() + 1);
  }

  const diffMs = proximaAbertura.getTime() - agora.getTime();
  const diffHoras = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMinutos = Math.floor((diffMs / (1000 * 60)) % 60);

  return {
    aberto: false,
    mensagem: `Fechado no momento. Abriremos em ${diffHoras}h ${diffMinutos}min`,
  };
}
