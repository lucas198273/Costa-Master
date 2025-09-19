import { type Order } from "../../data/orders";
import {
  Box,
  Heading,
  Text,
  Stack,
  Badge,
  useColorModeValue,
  ScaleFade,
} from "@chakra-ui/react";

// Função para converter data brasileira (DD/MM/YYYY, HH:MM:SS) para Date
const parseBrazilianDate = (dateStr?: string): Date | null => {
  if (!dateStr || dateStr === "Data inválida" || dateStr === "Data não disponível") return null;
  const [day, month, yearTime] = dateStr.split("/");
  if (!yearTime) return null;
  const [year, time] = yearTime.split(", ");
  const [hours, minutes, seconds] = time.split(":");
  return new Date(`${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`);
};

interface Props {
  order: Order;
}

export default function OrderCard({ order }: Props) {
  const cardBg = useColorModeValue("white", "gray.700");
  const cardBorderColor = useColorModeValue("gray.200", "gray.600");

  const statusColor =
    order.status === "pendente" ? "yellow" : order.status === "pago" ? "green" : "blue";

  const formatDate = (dateStr?: string) => {
    const date = parseBrazilianDate(dateStr);
    return date
      ? date.toLocaleString("pt-BR", { hour12: false, timeZone: "America/Sao_Paulo" })
      : "Data inválida";
  };

  return (
    <ScaleFade initialScale={0.95} in={true}>
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={cardBorderColor}
        borderRadius="lg"
        p="6"
        boxShadow="md"
        transition="all 0.2s"
        _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
      >
        <Stack spacing="3">
          <Heading as="h3" size="md" color="teal.600">
            {`Pedido #${order.id}`}
          </Heading>

          <Text>
            <strong>Cliente:</strong> {order.nome_cliente || "Não informado"}
          </Text>

          <Text>
            <strong>Itens:</strong>{" "}
            {order.pedido?.map(item => `${item.name} x${item.quantity}`).join(", ") || "Nenhum item"}
          </Text>

          <Text>
            <strong>Total:</strong> R${order.total?.toFixed(2) || "0.00"}
          </Text>

          <Badge colorScheme={statusColor} p="2" borderRadius="md">
            Status: {order.status || "pendente"}
          </Badge>

          <Text fontSize="sm" color="gray.500">
            <strong>Criado em:</strong> {formatDate(order.data)}
          </Text>
        </Stack>
      </Box>
    </ScaleFade>
  );
}
