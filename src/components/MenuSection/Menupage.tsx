import React, { useState } from "react";
import { Box, Container, Heading, Input, Stack, Button } from "@chakra-ui/react";
import { Helmet } from "react-helmet-async";
import { products as allProducts, type Product } from "../../data/Product";
import MenuSection from "./MenuSection";

const categories: { key: Product["category"] | "all"; label: string }[] = [
  { key: "all", label: "Todas" },
  { key: "infantil", label: "Infantil" },
  { key: "aro20", label: "Aro 20" },
  { key: "aro24", label: "Aro 24" },
  { key: "aro26", label: "Aro 26" },
  { key: "aro29", label: "Aro 29" },
  { key: "motorizadas", label: "Motorizadas" },
];

const colors = {
  amarelo: "#FFD700",
  azul: "#043741",
  branco: "#FFFFFF",
  preto: "#000000",
};

const MenuPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    "all" | Product["category"]
  >("all");

  const filteredProducts = allProducts.filter((product) => {
    const matchQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase());
    const matchCategory =
      activeCategory === "all" || product.category === activeCategory;
    return matchQuery && matchCategory;
  });

  const pageTitle =
    activeCategory === "all"
      ? "Catálogo Completo"
      : categories.find((c) => c.key === activeCategory)?.label || "Resultados";

  return (
    <>
      <Helmet>
        <title>{pageTitle} - Loja de Bicicletas</title>
        <meta
          name="description"
          content={`Explore nosso catálogo de ${pageTitle.toLowerCase()}.`}
        />
        <meta property="og:title" content={pageTitle} />
        <meta
          property="og:description"
          content={`Explore nosso catálogo de ${pageTitle.toLowerCase()}.`}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Box py={8} bg={colors.branco}>
        <Container maxW="7xl">
          <Stack spacing={6}>
            <Heading
              as="h1"
              size="2xl"
              textAlign="center"
              color={colors.preto}
              fontFamily="'Playfair Display', 'Merriweather', 'serif'"
              fontWeight="bold"
            >
              {pageTitle}
            </Heading>

            <Input
              placeholder="Buscar bicicletas..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="lg"
              borderRadius="full"
              bg={colors.branco}
              color={colors.preto}
              border="2px solid"
              borderColor={colors.preto}
              _focus={{ shadow: "md", borderColor: colors.azul }}
            />

            <Stack direction="row" justify="center" wrap="wrap" spacing={3}>
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  size="sm"
                  bg={
                    activeCategory === cat.key ? colors.preto : "transparent"
                  }
                  color={
                    activeCategory === cat.key ? colors.branco : colors.preto
                  }
                  fontFamily="'Merriweather', 'serif'"
                  fontWeight="bold"
                  border="1px solid"
                  borderColor={colors.preto}
                  _hover={{ bg: colors.azul, color: colors.branco }}
                  onClick={() => setActiveCategory(cat.key)}
                  borderRadius="full"
                >
                  {cat.label}
                </Button>
              ))}
            </Stack>
          </Stack>

          <Box mt={10}>
            <MenuSection
              title={pageTitle}
              items={filteredProducts}
              textColor={colors.preto}
              secondaryColor={colors.branco}
              fontFamily="'Merriweather', 'serif'"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MenuPage;
