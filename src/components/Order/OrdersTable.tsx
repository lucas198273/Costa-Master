interface Order {
  id: string;
  customer_name: string;
  items: string;
  total: number;
  created_at: string;
}

interface Props {
  orders: Order[];
}

export default function OrdersTable({ orders }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-emerald-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Cliente</th>
            <th className="px-4 py-2 text-left">Itens</th>
            <th className="px-4 py-2 text-left">Total</th>
            <th className="px-4 py-2 text-left">Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-4">
                Nenhum pedido encontrado
              </td>
            </tr>
          ) : (
            orders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{order.customer_name}</td>
                <td className="px-4 py-2">{order.items}</td>
                <td className="px-4 py-2">R$ {order.total.toFixed(2)}</td>
                <td className="px-4 py-2">
                  {new Date(order.created_at).toLocaleString("pt-BR", {
                    timeZone: "America/Sao_Paulo",
                  })}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
