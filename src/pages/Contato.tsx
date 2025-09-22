// src/pages/ContatoParcerias.tsx
import {
  Box,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  VStack,
} from "@chakra-ui/react";

const Contato = () => {
  return (
    <Box as="section" mt="40" maxW="4xl" mx="auto" px={{ base: 4, md: 8 }}>
      <Box
        bg="#043741"
        color="white"
        rounded="2xl"
        p={{ base: 8, md: 12 }}
        shadow="xl"
        textAlign="center"
      >
        <Heading fontSize={{ base: "3xl", md: "4xl" }} mb={6}>
          Parcerias & Divulgação
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} opacity={0.9} mb={10} lineHeight="taller">
          A <Text as="span" fontWeight="semibold">Bicicletas Costa</Text> está aberta para colaborações, eventos e ações de divulgação.
          Se você deseja propor uma parceria, enviar mídia kit ou promover um evento/produto, preencha o formulário abaixo e entraremos em contato.
        </Text>

        <Box
          as="form"
          action="https://getform.io/f/aolzrlnb"
          method="POST"
          bg="white"
          color="gray.800"
          rounded="xl"
          p={8}
          shadow="inner"
        >
          <VStack spacing={6}>
            <FormControl>
              <FormLabel>Nome</FormLabel>
              <Input
                type="text"
                name="name"
                placeholder="Seu nome"
                required
                focusBorderColor="#FFD700"
              />
            </FormControl>

            <FormControl>
              <FormLabel>E-mail</FormLabel>
              <Input
                type="email"
                name="email"
                placeholder="seuemail@exemplo.com"
                required
                focusBorderColor="#FFD700"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Assunto</FormLabel>
              <Input
                type="text"
                name="subject"
                placeholder="Ex: Proposta de parceria"
                focusBorderColor="#FFD700"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Mensagem</FormLabel>
              <Textarea
                name="message"
                placeholder="Conte os detalhes da sua proposta"
                rows={5}
                resize="none"
                required
                focusBorderColor="#FFD700"
              />
            </FormControl>

            {/* Honeypot anti-spam */}
            <Input type="hidden" name="_gotcha" display="none" />

            <Button
              type="submit"
              bg="#FFD700"
              color="#043741"
              fontWeight="semibold"
              px={6}
              py={3}
              rounded="md"
              shadow="md"
            >
              Enviar proposta
            </Button>
          </VStack>
        </Box>
      </Box>

      <Box mt={8} textAlign="center" color="gray.700" fontSize="sm">
        <Text>📍 Endereço: Rua Exemplo, 123 — Cidade, Estado</Text>
        <Text>🚲 Abertura: desde 2010 • Bicicletas Costa</Text>
      </Box>
    </Box>
  );
};

export default Contato;
