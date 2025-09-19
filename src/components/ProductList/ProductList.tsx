import { Box, Image, Text, Stack, Badge } from "@chakra-ui/react";
import { type Product } from "../../data/Product";

interface Props {
  items: Product[];
}

export default function ProductList({ items }: Props) {
  if (items.length === 0) {
    return <Text mt={4} textAlign="center" color="gray.500">Nenhum produto encontrado.</Text>;
  }

  return (
    <Stack spacing={6} mt={6}>
      {items.map((product) => (
        <Box
          key={product.id}
          p={4}
          borderWidth="1px"
          borderRadius="lg"
          boxShadow="sm"
          _hover={{ boxShadow: "md" }}
        >
          <Stack direction="row" spacing={4}>
            <Image src={product.imageUrl} alt={product.name} boxSize="100px" objectFit="cover" borderRadius="md" />
            <Stack spacing={1}>
              <Text fontWeight="bold" fontSize="lg">{product.name}</Text>
              <Text fontSize="sm" color="gray.600">{product.description}</Text>
              <Badge colorScheme="green" w="fit-content">R$ {product.price?.toFixed(2)}</Badge>
            </Stack>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
