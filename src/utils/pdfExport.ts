import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { type Order } from "../data/orders";

export const generatePDF = (orders: Order[], date: string) => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  });

  const pageWidth = doc.internal.pageSize.getWidth();

  // Título centralizado
  doc.setFontSize(16);
  const title = `Relatório de Pedidos - Data: ${date}`;
  const titleX = (pageWidth - doc.getTextWidth(title)) / 2;
  doc.text(title, titleX, 20);

  // Texto de geração centralizado
  doc.setFontSize(10);
  const generatedText = `Gerado em: ${currentDate}`;
  const generatedX = (pageWidth - doc.getTextWidth(generatedText)) / 2;
  doc.text(generatedText, generatedX, 30);

  const calculateWaitTime = (createdAt: string) => {
    const created = new Date(
      createdAt.replace(
        /(\d{2})\/(\d{2})\/(\d{4}), (\d{2}:\d{2}:\d{2})/,
        "$3-$2-$1T$4Z"
      )
    );
    const now = new Date();
    if (isNaN(created.getTime())) return "Não disponível";
    const diffMs = now.getTime() - created.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${diffHours}h ${diffMinutes}min`;
  };

  const totalAmount = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  let tableFinalY = 0;

  autoTable(doc, {
    head: [
      [
        "ID",
        "Cliente",
        "Itens",
        "Total",
        "Data",
        "Status",
        "Tipo",
        "Mesa",
        "Tempo de Espera",
      ],
    ],
    body: orders.map((order) => {
      const itemsDetail = order.pedido
        ? order.pedido
            .map(
              (item: any) =>
                `${item.name} x${item.quantity} (R$ ${item.price.toFixed(2)})`
            )
            .join("\n")
        : "Nenhum item";
      return [
        order.id,
        `Pedido #${order.id}`,
        itemsDetail,
        `R$ ${order.total?.toFixed(2) || "0.00"}`,
        order.data || "Data não disponível",
        order.status || "pendente",
        order.tipo || "N/A",
        order.mesa || "N/A",
        calculateWaitTime(order.data || new Date().toISOString()),
      ];
    }),
    startY: 40,
    styles: {
      overflow: "linebreak",
      cellWidth: "wrap",
      halign: "center",
      valign: "middle",
    },
    headStyles: { halign: "center", fillColor: [200, 220, 255] },
    columnStyles: {
      2: { cellWidth: 70 }, // mais espaço para coluna de itens
    },
    margin: { left: 25, right: 25 }, // margens maiores para centralizar a tabela
    didDrawPage: (data) => {
      tableFinalY = data.cursor?.y ?? 50;
    },
  });

  // Total centralizado abaixo da tabela
  const totalText = `Total do Dia: R$ ${totalAmount.toFixed(2)}`;
  const totalX = (pageWidth - doc.getTextWidth(totalText)) / 2;
  doc.setFontSize(12);
  doc.text(totalText, totalX, tableFinalY + 10);

  doc.save(`pedidos_${date}.pdf`);
};
