import {
  Box,
  Grid,
  Image,
  Text,
  Heading,
  Stack,
  Badge,
  Button,
} from "@chakra-ui/react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { type Product } from "../../data/Product";

interface Props {
  title: string;
  items: Product[];
  textColor: string;
  secondaryColor: string;
  fontFamily: string;
}

const MenuSection: React.FC<Props> = ({
  title,
  items,
  textColor,
  secondaryColor,
  fontFamily,
}) => {
  const phoneNumber = "55SEUNUMEROAQUI"; // coloque seu número

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      offset: 50,
    });
  }, []);

  const sendToWhatsApp = (product: Product) => {
    const message = `Olá! Tenho interesse na bicicleta:\n\n🚲 *${product.name}*\n💰 Preço: R$ ${product.price}\n📂 Categoria: ${product.category}\n\nPoderia me dar mais informações?`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  };

  if (items.length === 0) {
    return (
      <Heading as="h3" size="md" textAlign="center" color="gray.500" mt={10}>
        Nenhum item encontrado 😢
      </Heading>
    );
  }

  return (
    <Box py={8} px={4} maxW="7xl" mx="auto">
      <Heading
        as="h2"
        size="xl"
        textAlign="center"
        mb={6}
        color={textColor}
        fontFamily={fontFamily}
      >
        {title}
      </Heading>

      <Grid
        templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={6}
      >
        {items.map((product, index) => (
          <Box
            key={product.id}
            bg={secondaryColor}
            border="1px solid"
            borderColor="gray.200"
            shadow="sm"
            overflow="hidden"
            data-aos="fade-up"
            data-aos-delay={index * 100}
            _hover={{ shadow: "md", transform: "translateY(-4px)" }}
            transition="all 0.3s ease"
          >
            {/* Imagem */}
            <Image
              src={product.imageUrl}
              alt={product.name}
              h="52"
              w="full"
              objectFit="cover"
            />

            {/* Conteúdo */}
            <Stack p={5} spacing={3}>
              <Text
                fontWeight="bold"
                fontSize="lg"
                color={textColor}
                fontFamily={fontFamily}
              >
                {product.name}
              </Text>

              {product.description && (
                <Text fontSize="sm" color="gray.700" noOfLines={3}>
                  {product.description}
                </Text>
              )}

              <Stack direction="row" justify="space-between" align="center">
                <Stack spacing={1}>
                  <Text
                    fontWeight="bold"
                    fontSize="lg"
                    color="green.600"
                    fontFamily={fontFamily}
                  >
                    {product.price?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </Text>

                  <Badge
                    colorScheme={product.available ? "green" : "red"}
                    fontSize="0.8em"
                    w="fit-content"
                  >
                    {product.available ? "Disponível" : "Indisponível"}
                  </Badge>
                </Stack>

                <Button
                  size="sm"
                  bg="black"
                  color="white"
                  borderRadius="full"
                  onClick={() => sendToWhatsApp(product)}
                  isDisabled={!product.available}
                  _hover={{ bg: "green.700" }}
                >
                  WhatsApp
                </Button>
              </Stack>
            </Stack>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuSection;
