import { useState, useEffect, useRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  IconButton,
  HStack,
  Link,
  Badge,
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

interface Props {
  onCartClick: () => void;
  cartItemCount: number;
}

export default function DeliveryHeader({ onCartClick, cartItemCount }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isScrolled, setIsScrolled] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Início" },
    { to: "/politicas", label: "Políticas" },
    { to: "/about", label: "Sobre" },
  ];

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="full"
      zIndex="50"
      bg={isScrolled ? "whiteAlpha.900" : "white"}
      borderBottom="2px solid"
      borderColor="red.500"
      boxShadow={isScrolled ? "sm" : "none"}
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
          color="red.500"
          mr={2}
        />

        {/* Desktop Nav Links */}
        <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              as={RouterLink}
              to={link.to}
              fontWeight="bold"
              color="red.500"
              _hover={{ color: "red.600" }}
            >
              {link.label}
            </Link>
          ))}
        </HStack>

        {/* Logo Central */}
        <Box
          position="absolute"
          left="50%"
          transform="translateX(-50%)"
          bg="black"
          borderRadius="full"
          p="1"
          boxShadow="lg"
          flexShrink={0}
        >
          <Link as={RouterLink} to="/">
            <Image
              src="/himgs/logo.webp"
              alt="The Brothers Hamburgueria"
              h="14"
              className="rounded-full transition-transform duration-300 hover:scale-105"
              objectFit="contain"
            />
          </Link>
        </Box>

        {/* Cart */}
        <Box position="relative">
          <IconButton
            ref={btnRef}
            aria-label={`Ver carrinho com ${cartItemCount} itens`}
            icon={
              <Box as="svg" w={6} h={6} fill="currentColor">
                <path d="M4 6h16l-2 10H6L4 6zm4 12h8v2H8v-2zm-4-2h16v2H4v-2zm0-8v2h16V8H4z" />
              </Box>
            }
            variant="ghost"
            color="red.500"
            onClick={onCartClick}
          />
          {cartItemCount > 0 && (
            <Badge
              position="absolute"
              top="0"
              right="0"
              bg="red.500"
              color="white"
              borderRadius="full"
              fontSize="xs"
              px="2"
              transform="translate(50%, -50%)"
            >
              {cartItemCount}
            </Badge>
          )}
        </Box>
      </Flex>

      {/* Mobile Drawer */}
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navegação</DrawerHeader>
          <DrawerBody>
            <Stack as="nav" spacing={4}>
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  as={RouterLink}
                  to={link.to}
                  fontSize="lg"
                  color="red.500"
                  onClick={onClose}
                  _hover={{ color: "red.600" }}
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
