import { useState, useEffect } from "react";
import { getOrders, type Order } from "../data/orders";
import DateFilter from "../components/Order/DateFilter";
import { Box, Heading, Flex, Grid, GridItem, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";
import OrderCard from "../components/Order/OrderCard";
import { generatePDF } from "../utils/pdfExport"; // Ajuste o caminho conforme necessário

// Função para converter data no formato brasileiro (DD/MM/YYYY, HH:MM:SS) para ISO
const parseBrazilianDate = (dateStr: string): Date | null => {
  if (!dateStr || dateStr === "Data inválida" || dateStr === "Data não disponível") return null;
  const [day, month, yearTime] = dateStr.split("/");
  if (!yearTime) return null;
  const [year, time] = yearTime.split(", ");
  const [hours, minutes, seconds] = time.split(":");
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
};

// Função simulada para obter informações da assinatura
const getSubscriptionInfo = () => {
  // Substitua esta função pela lógica real de obtenção da assinatura
  return {
    expirationDate: "01/09/2026,  23:59:59", // Exemplo de data de vencimento
  };
};

export default function OrdersPanel() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const [subscriptionStatus, setSubscriptionStatus] = useState<string>("");

  useEffect(() => {
    // Carregar pedidos
    async function loadOrders() {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (err) {
        console.error("Erro ao carregar pedidos:", err);
      } finally {
        setLoading(false);
      }
    }

    // Verificar status da assinatura
    const { expirationDate } = getSubscriptionInfo();
    const expirationDateObj = parseBrazilianDate(expirationDate);
    if (expirationDateObj) {
      const currentDate = new Date();
      if (currentDate > expirationDateObj) {
        setSubscriptionStatus("expirada");
      } else if (currentDate.getTime() === expirationDateObj.getTime()) {
        setSubscriptionStatus("vencendo hoje");
      } else {
        setSubscriptionStatus("ativa");
      }
    }

    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const orderDate = parseBrazilianDate(order.data);
    if (!orderDate || isNaN(orderDate.getTime())) {
      console.warn("Data inválida ou ausente para o pedido ID:", order.id, "Valor:", order.data);
      return false;
    }
    const orderDateStr = orderDate.toISOString().split("T")[0];
    return orderDateStr === selectedDate;
  });

  const handleExportPDF = () => {
    generatePDF(filteredOrders, selectedDate);
  };

  return (
    <Box className="p-8 mt-24">
      <Heading as="h1" size="xl" fontWeight="bold" mb="6">
        Pedidos
      </Heading>

      {/* Aviso de assinatura */}
      <Box mb="6">
        {subscriptionStatus === "expirada" && (
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Assinatura Expirada</AlertTitle>
            <AlertDescription>Seu acesso ao sistema expirou. Por favor, renove sua assinatura para continuar utilizando.</AlertDescription>
          </Alert>
        )}
        {subscriptionStatus === "vencendo hoje" && (
          <Alert status="warning">
            <AlertIcon />
            <AlertTitle>Assinatura Vencendo Hoje</AlertTitle>
            <AlertDescription>Seu acesso ao sistema vence hoje. Renove sua assinatura para evitar interrupções.</AlertDescription>
          </Alert>
        )}
        {subscriptionStatus === "ativa" && (
          <Alert status="success">
            <AlertIcon />
            <AlertTitle>Assinatura Ativa</AlertTitle>
            <AlertDescription>Seu acesso ao sistema está ativo até {getSubscriptionInfo().expirationDate}.</AlertDescription>
          </Alert>
        )}
      </Box>

      <Flex mb="6" align="center" justify="space-between">
        <DateFilter selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        <Button colorScheme="teal" onClick={handleExportPDF} isDisabled={filteredOrders.length === 0}>
          Exportar PDF
        </Button>
      </Flex>

      {loading ? (
        <Heading as="h3" size="md">Carregando pedidos...</Heading>
      ) : filteredOrders.length > 0 ? (
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {filteredOrders.map((order) => (
            <GridItem key={order.id}>
              <OrderCard order={order} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Heading as="h3" size="md" mt="4" color="gray.500">
          Nenhum pedido encontrado para a data selecionada.
        </Heading>
      )}
    </Box>
  );
}
