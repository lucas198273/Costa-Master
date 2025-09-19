"use client";

import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  Stack,
} from "@chakra-ui/react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <Box
      as="section"
      position="relative"
      w="full"
      minH={{ base: "100vh", md: "100vh" }} // altura mínima da tela, mas cresce se necessário
      py={{ base: 12, md: 20 }} // padding interno
      _before={{
        content: `""`,
        position: "absolute",
        top: 0,
        left: 0,
        w: "full",
        h: "full",
        bgGradient: "linear(to-b, #0a0a1a, red.600)",
        zIndex: 0,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Flex
        position="relative"
        zIndex={1}
        direction={{ base: "column-reverse", md: "row" }}
        maxW="7xl"
        w="full"
        align="center"
        justify="space-between"
        px={6}
        gap={{ base: 10, md: 16 }} // espaçamento entre texto e imagem
        textAlign={{ base: "center", md: "left" }}
      >
        {/* Texto e Logos */}
        <Box mb={{ base: 10, md: 0 }} data-aos="fade-right">
          {/* Logos lado a lado em todas as resoluções */}
          <Flex
            direction="row" // Força linha em todas as resoluções
            alignItems="center"
            justifyContent={{ base: "center", md: "flex-start" }}
            mb={6}
            gap={{ base: 2, md: 4 }} // Espaçamento menor em mobile, maior em desktop
            flexWrap="wrap" // Permite quebra de linha se necessário
          >
            <Image
              src="/himgs/logo.webp"
              alt="Logo The Brothers 1"
              maxH={{ base: "80px", md: "120px" }} // Tamanho menor em mobile
              data-aos="zoom-in"
            />
            <Image
              src="/himgs/logo2.webp"
              alt="Logo The Brothers 2"
              maxH={{ base: "80px", md: "120px" }} // Tamanho menor em mobile
              data-aos="zoom-in"
            />
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl" }}
            fontWeight="bold"
            color="white"
            mb={4}
          >
            Bem-vindo ao <br /> The Brothers Bar 🍻
          </Heading>

          <Text
            fontSize={{ base: "md", md: "xl" }}
            color="whiteAlpha.800"
            mb={6}
          >
            Petiscos irresistíveis, hambúrgueres artesanais e aquela cerveja
            gelada do jeito que você gosta.
          </Text>

          {/* Endereço */}
          <Stack
            spacing={1}
            fontSize={{ base: "sm", md: "md" }}
            color="whiteAlpha.900"
            data-aos="fade-up"
          >
            <Text>📍Rua do Rosario nº1091   Bairro Angola - Betim/MG</Text>
          </Stack>
        </Box>

        {/* Imagem lateral */}
        <Box
          display={{ base: "block", md: "block" }}
          data-aos="fade-left"
        >
          <Image
            src="/himgs/image.png"
            alt="Ambiente do bar"
            borderRadius="2xl"
            shadow="2xl"
            maxH={{ base: "280px", md: "460px" }}
            objectFit="cover"
            mx="auto"
          />
        </Box>
      </Flex>
    </Box>
  );
}