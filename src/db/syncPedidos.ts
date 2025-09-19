import db,{ type Order } from "../db/db";
import { supabase } from "../lib/supabaseClient";

// Assumindo que o tipo Order inclui id_uuid: string. Se não, adicione ao type Order.

export async function syncPedidos() {
  try {
    const pedidos: Order[] = await db.getOrders();

    if (pedidos.length === 0) {
      console.log("Nenhum pedido para sincronizar.");
      return;
    }

    for (const pedido of pedidos) {
      if (!pedido.id_uuid) {
        console.warn(`Pedido local sem id_UUID (ID local: ${pedido.id}). Pulando sincronização.`);
        continue;
      }

      // Busca se o pedido existe no Supabase pelo id_UUID
      const { data: existingPedido, error: fetchError } = await supabase
        .from("pedidos")
        .select("id, id_uuid, status")
        .eq("id_uuid", pedido.id_uuid)
        .maybeSingle();  // Retorna null se não existir, ou um registro

      if (fetchError) {
        console.error(
          `Erro ao buscar pedido (id_UUID: ${pedido.id_uuid}):`,
          JSON.stringify(fetchError, null, 2)
        );
        continue;
      }

      if (existingPedido) {
        // Existe: Atualiza apenas o status
        const { error: updateError } = await supabase
          .from("pedidos")
          .update({ status: pedido.status })
          .eq("id_uuid", pedido.id_uuid);

        if (updateError) {
          console.error(
            `Erro ao atualizar status do pedido (id_UUID: ${pedido.id_uuid}):`,
            JSON.stringify(updateError, null, 2)
          );
          continue;
        }

        console.log(
          `Status atualizado no Supabase. id_UUID: ${pedido.id_uuid}, Novo status: ${pedido.status}`
        );
      } else {
        // Não existe: Insere novo pedido (sem id, que é gerado automaticamente)
        const pedidoParaSupabase = {
          id_uuid: pedido.id_uuid,
          pedido: pedido.pedido,
          total: pedido.total,
          data: pedido.data,
          status: pedido.status,
          tipo: pedido.tipo,
          mesa: pedido.mesa,
          observacao: pedido.observacao,
          endereco: pedido.endereco,
        };

        const { data, error: insertError } = await supabase
          .from("pedidos")
          .insert(pedidoParaSupabase)
          .select("id, id_uuid");

        if (insertError) {
          console.error(
            `Erro ao inserir novo pedido (id_UUID: ${pedido.id_uuid}):`,
            JSON.stringify(insertError, null, 2)
          );
          continue;
        }

        const supabaseId = data?.[0]?.id;
        console.log(
          `Novo pedido inserido no Supabase. id_UUID: ${pedido.id_uuid}, ID Supabase: ${supabaseId}`
        );
      }

      // Opcional: Atualize o pedido local se necessário (ex.: marque como sincronizado)
      // await db.markAsSynced(pedido.id);  // Implemente se precisar
    }
  } catch (err) {
    console.error("Erro na sincronização geral:", JSON.stringify(err, null, 2));
  }
}