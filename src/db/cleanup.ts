import db from "./db";

/**
 * Limpa TODOS os pedidos do IndexedDB
 */
export async function clearAllOrders() {
  try {
    await db.clearOrders(); // Corrigido de clearOrders para clearPedidos
    console.log("✅ Histórico de pedidos (IndexedDB) limpo com sucesso!");
  } catch (err) {
    console.error("❌ Erro ao limpar pedidos:", err);
  }
}

/**
 * Agenda a limpeza diária em um horário fixo
 * @param hour Hora do dia (0–23)
 * @param minute Minuto (0–59)
 */
export function dailyCleanupIfNeeded() {
  const now = new Date();
  const lastClear = localStorage.getItem("lastClear");
  const today = now.toDateString();

  // Verifica se a limpeza já foi realizada hoje
  if (lastClear === today) {
    console.log("ℹ️ Limpeza já realizada hoje.");
    return;
  }

  // Verifica se o horário atual está entre 12:00 e 23:59
  if (now.getHours() >= 12 && now.getHours() < 24) {
    clearAllOrders()
      .then(() => {
        localStorage.setItem("lastClear", today);
        console.log("✅ Limpeza concluída e registrada.");
      })
      .catch((err) => {
        console.error("❌ Erro na limpeza:", err);
      });
  } else {
    console.log("ℹ️ Fora do horário de limpeza (12:00–23:59).");
  }
}
