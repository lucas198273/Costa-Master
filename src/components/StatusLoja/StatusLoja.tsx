"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { verificarHorarioAtual } from "../../utils/horarios"; // ajuste o caminho

export default function StatusLoja() {
  const [status, setStatus] = useState(verificarHorarioAtual());

  useEffect(() => {
    const interval = setInterval(() => {
      setStatus(verificarHorarioAtual());
    }, 60000); // atualiza a cada 1min
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      bg="#043741" // azul
      color="white"
      p={4}
      rounded="xl"
      shadow="md"
      maxW="sm"
      mx="auto"
      my={6}
      textAlign="center"
      border="2px solid"
      borderColor="#FFD700" // amarelo
    >
      <VStack spacing={2}>
        <Text
          fontSize="md"
          fontWeight="semibold"
          color={status.aberto ? "green.300" : "red.300"}
        >
          {status.aberto ? "Aberto agora" : "Fechado no momento"}
        </Text>

        <Text fontSize="sm" fontWeight="medium" color="#FFD700">
          {status.mensagem}
        </Text>

        <Text fontSize="xs" color="gray.400">
          Desde 2010 oferecendo qualidade e confiança
        </Text>
      </VStack>
    </Box>
  );
}
