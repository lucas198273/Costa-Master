import {  useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  HStack,
  Link,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Image,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/about", label: "Sobre" },
    { to: "/products", label: "Tatuagens" },
    { to: "/afiliados", label: "Afiliados" },
    { to: "/politicas", label: "Políticas" },
    { to: "/galeria", label: "Galeria" },
  ];

  const colors = {
    amarelo: "#FFD700", // fundo
    azul: "#043741",    // hover/destaque
    branco: "#FFFFFF",   // texto
  };

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="full"
      zIndex="50"
      bg={colors.azul}
      borderBottom="4px solid"
      borderColor={colors.azul}
      boxShadow="md"
      transition="all 0.3s ease"
    >
      <Flex
        maxW="7xl"
        mx="auto"
        h="20"
        px={{ base: 4, md: 8 }}
        align="center"
        justify="space-between"
        position="relative"
      >
        {/* Mobile Menu */}
        <IconButton
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle menu"
          display={{ base: "block", md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
          color={colors.amarelo}
          mr={2}
          ref={btnRef}
        />

        {/* Desktop Nav Links esquerda */}
        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
          {navLinks.slice(0, 3).map((link) => (
            <Link
              key={link.to}
              as={RouterLink}
              to={link.to}
              fontWeight="bold"
              color={colors.branco}
              _hover={{ color: colors.azul, textDecoration: "underline" }}
            >
              {link.label}
            </Link>
          ))}
        </HStack>

        {/* Logo central */}
        <Box
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          flexShrink={0}
          boxShadow="lg"
          borderRadius="full"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        >
          <Link as={RouterLink} to="/">
            <Image
              src="/himgs/logo.webp"
              alt="Logo Studio"
              h="16"
              objectFit="contain"
              borderRadius="full"
            />
          </Link>
        </Box>

        {/* Desktop Nav Links direita */}
        <HStack as="nav" spacing={6} display={{ base: "none", md: "flex" }}>
          {navLinks.slice(3).map((link) => (
            <Link
              key={link.to}
              as={RouterLink}
              to={link.to}
              fontWeight="bold"
              color={colors.branco}
              _hover={{ color: colors.azul, textDecoration: "underline" }}
            >
              {link.label}
            </Link>
          ))}
        </HStack>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} placement="left">
        <DrawerOverlay />
        <DrawerContent bg={colors.azul}>
          <DrawerCloseButton color={colors.azul} />
          <DrawerHeader color={colors.azul}>Navegação</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={4}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  as={RouterLink}
                  to={link.to}
                  fontSize="lg"
                  color={colors.branco}
                  onClick={onClose}
                  _hover={{ color: colors.branco }}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
