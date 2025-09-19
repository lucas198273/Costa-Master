import Dexie, { type Table } from "dexie";

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id?: number; // Dexie auto incrementa
  id_supabase?: number | null; // ID do Supabase
  id_uuid: string; // UUID local
  pedido: OrderItem[];
  total: number;
  data: Date;
  status: "pendente" | "pago" | "pronto";
  tipo?: "mesa" | "entrega" | null;
  mesa?: string | null;
  observacao?: string;
  endereco?: {
    nome: string;
    rua: string;
    bairro: string;
    referencia: string;
  };
  nome_cliente: string;
}

export class OrdersDB extends Dexie {
  Orders!: Table<Order, number>;

  constructor() {
    super("OrdersDB");
    this.version(1).stores({
      Orders: "++id, id_uuid, id_supabase, Order, status, total, mesa, tipo, observacao, endereco, data, nome_cliente",
    });
  }

  async saveOrder(OrderData: Order): Promise<number> {
    return await this.Orders.add(OrderData);
  }

  async getOrders(): Promise<Order[]> {
    return await this.Orders.toArray();
  }

  async updateOrder(id: number, changes: Partial<Order>): Promise<void> {
    await this.Orders.update(id, changes);
  }

  async deleteOrder(id: number): Promise<void> {
    await this.Orders.delete(id);
  }

  async clearOrders(): Promise<void> {
    await this.Orders.clear();
  }
}

const db = new OrdersDB();
export default db;
