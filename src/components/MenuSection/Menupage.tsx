import React, { useState } from 'react';
import { Box, Container, Heading, Input, Stack, Button } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { products as allProducts, type Product } from '../../data/Product';
import MenuSection from './MenuSection';

const categories: { key: Product['category'] | 'all'; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'artesanal', label: 'Artesanal' },
  { key: 'hamburguer', label: 'Hambúrguer' },
  { key: 'bebida', label: 'Bebidas' },
  { key: 'porcao', label: 'Porções' },
];

const MenuPage: React.FC = () => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | Product['category']>('all');

  const filteredProducts = allProducts.filter((product) => {
    const matchQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description?.toLowerCase().includes(query.toLowerCase());
    const matchCategory = activeCategory === 'all' || product.category === activeCategory;
    return matchQuery && matchCategory;
  });

  const pageTitle = activeCategory === 'all' ? 'Cardápio Completo' : categories.find((c) => c.key === activeCategory)?.label || 'Resultados';

  return (
    <>
      <Helmet>
        <title>{pageTitle} - Sua Loja de Delícias</title>
        <meta name="description" content={`Explore nosso cardápio de ${pageTitle.toLowerCase()}.`} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={`Explore nosso cardápio de ${pageTitle.toLowerCase()}.`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Box py={8} bg="white">
        <Container maxW="7xl">
          <Stack spacing={6}>
            <Heading as="h1" size="xl" textAlign="center" color="green.600" textShadow="1px 1px 2px rgba(0,0,0,0.2)">
              {pageTitle}
            </Heading>

            <Input
              placeholder="Buscar no cardápio..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              size="lg"
              borderRadius="full"
              bg="white"
              shadow="sm"
              border="2px solid"
              borderColor="green.400"
              _focus={{ shadow: 'md', borderColor: 'green.500' }}
            />

            <Stack direction="row" justify="center" wrap="wrap" spacing={3}>
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  size="sm"
                  colorScheme={activeCategory === cat.key ? 'green' : 'gray'}
                  onClick={() => setActiveCategory(cat.key)}
                  borderRadius="full"
                  variant={activeCategory === cat.key ? 'solid' : 'outline'}
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
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default MenuPage;
