import React from "react";
import { Box, Heading, Text, Stack, Button, Container } from "@chakra-ui/react";

const PaymentInfo: React.FC = () => {
  const phoneNumber = "55SEUNUMEROAQUI"; // coloque seu WhatsApp

  const handleWhatsAppClick = () => {
    const message = "Olá! Gostaria de mais informações sobre formas de pagamento das bicicletas.";
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <Box bg="gray.50" py={16}>
      <Container maxW="5xl">
        <Stack spacing={8} textAlign="center">
          <Heading
            as="h2"
            size="2xl"
            color="black"
            fontFamily="'Playfair Display', serif"
            fontWeight="bold"
          >
            Formas de Pagamento
          </Heading>

          <Text fontSize="lg" color="gray.700" maxW="700px" mx="auto">
            Todas as compras de bicicletas são finalizadas pessoalmente. Aceitamos pagamentos em dinheiro, PIX ou cartão físico diretamente na loja. 
            Para reservar sua bicicleta ou tirar dúvidas, você pode entrar em contato pelo WhatsApp abaixo.
          </Text>

          <Button
            size="lg"
            colorScheme="green"
            bg="#25D366"
            color="white"
            _hover={{ bg: "#1ebe5d" }}
            onClick={handleWhatsAppClick}
          >
            Contato via WhatsApp
          </Button>

      
        </Stack>
      </Container>
    </Box>
  );
};

export default PaymentInfo;
