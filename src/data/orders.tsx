import { supabase } from "../lib/supabaseClient";

export interface Order {
  id: number | string;
  total: number | null;
  data: string; // Formato brasileiro ou string formatada por formatDate
  status: string | null;
  tipo: string | null;
  mesa: string | null;
  observacao: string | null;
  nome_cliente: string | null;
  endereco: any; // jsonb
  pedido: { name: string; price: number; quantity: number }[] | null; // Itens do pedido
}

export async function getOrders(): Promise<Order[]> {
  const { data, error } = await supabase
    .from("pedidos")
    .select("*")
    .order("data", { ascending: false });

  if (error) throw error;

  const formatDate = (dateString: string) => {
    if (!dateString) return "Data não disponível";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.error("Data inválida detectada:", dateString);
      return "Data inválida";
    }
    return date.toLocaleString("pt-BR", {
      timeZone: "America/Sao_Paulo",
      hour12: false,
    });
  };

  return (data as Order[]).map((order) => ({
    ...order,
    data: formatDate(order.data),
  }));
}