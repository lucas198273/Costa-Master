import React from "react";
import type { CartItem } from "../../../contexts/CartContext";
import { useCart } from "../../../contexts/CartContext";
import { toast } from "react-toastify";
import { Flex, VStack, HStack, Image, Text, Button, Spacer, Box } from "@chakra-ui/react";

interface Props {
  item: CartItem;
  onRemove: (id: string) => void;
}

const CartRow: React.FC<Props> = ({ item, onRemove }) => {
  const { incrementQuantity, decrementQuantity, addItem, items } = useCart();

  const handleAddCombo = () => {
    const existingCombos = items.filter(
      (i) => i.isCombo && i.id === `combo-${item.id}`
    )[0]?.quantity || 0;

    if (existingCombos >= item.quantity) {
      toast.info("Você já adicionou todos os combos permitidos para este item!");
      return;
    }

    const comboItem: CartItem = {
      id: `combo-${item.id}`,
      name: "Combo + Refrigerante 350ml e Batata",
      price: 15.0,
      quantity: 1,
      comboQuantity: 1,
      isCombo: true,
      isBurger: false,
      imageUrl: "/assets/combo.png",
    };
    addItem(comboItem, true);
    toast.success("Combo adicionado com sucesso!");
  };

 
  return (
    <Flex
      w="full"
      direction={{ base: "column", md: "row" }}
      align="center"
      p={3}
      bg="green.50"
      borderRadius="md"
      mb={3}
      gap={4}
      _hover={{ bg: "green.100" }}
    >
      {/* Imagem */}
      <Box flexShrink={0}>
        <Image
          src={item.imageUrl}
          alt={item.name}
          boxSize={{ base: "120px", md: "100px" }}
          objectFit="cover"
          borderRadius="md"
          shadow="md"
        />
      </Box>

      {/* Detalhes */}
      <VStack align="start" spacing={2} flex="1" minW="0">
        <Text fontWeight="600" fontSize="md" color="green.800" noOfLines={2}>
          {item.name}
        </Text>
        <Text fontWeight="700" fontSize="lg" color="green.900">
          R$ {(item.price * item.quantity).toFixed(2)}
        </Text>

        <HStack spacing={2} wrap="wrap">
          <Button size="sm" colorScheme="red" onClick={() => decrementQuantity(item.id)} isDisabled={item.quantity <= 1} minW="32px">-</Button>
          <Text fontSize="sm" fontWeight="medium">{item.quantity}</Text>
          <Button size="sm" colorScheme="green" onClick={() => incrementQuantity(item.id)} minW="32px">+</Button>
          <Button size="sm" colorScheme="red" variant="outline" onClick={() => onRemove(item.id)} minW="70px">Remover</Button>
        </HStack>
      </VStack>

      <Spacer />

      {/* Combos */}
      <VStack spacing={2} flexShrink={0} align={{ base: "flex-start", md: "end" }}>
        <HStack spacing={2} wrap="wrap">
          <Button size="sm" colorScheme="green" onClick={handleAddCombo} minW="100px">
            Adicionar Combo
          </Button>
         
        </HStack>
        <Text fontSize="sm" color="green.700" noOfLines={1}>
          + Refrigerante 350ml e Batata
        </Text>
      </VStack>
    </Flex>
  );
};

export default CartRow;
