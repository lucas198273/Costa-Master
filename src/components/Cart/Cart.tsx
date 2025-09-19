"use client";

import React, { useState, useEffect } from "react";
import { useCart } from "../../../contexts/CartContext";
import CartItemRow from "./CartRow";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Cart.module.css";
import {
  Box,
  Flex,
  VStack,
  HStack,
  Text,
  Button,
  Input,
  Textarea,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { verificarHorarioAtual } from "../../utils/horarios";
import db, { type Order } from "../../db/db";
import { supabase } from "../../lib/supabaseClient";
import { v4 as uuidv4 } from "uuid";

// Formata data para horário de São Paulo
const formatDateToSaoPaulo = (date: string | Date) => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour12: false,
  });
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
const Cart: React.FC<Props> = ({ isOpen, onClose }) => {
  const { items, total, removeItem, clearCart } = useCart();

  const [pedidoTipo, setPedidoTipo] = useState<"mesa" | "entrega" | null>(null);
  const [mesaSelecionada, setMesaSelecionada] = useState<string | null>(null);
  const [nomeCliente, setNomeCliente] = useState("");
  const [observacao, setObservacao] = useState("");
  const [endereco, setEndereco] = useState({
    nome: "",
    rua: "",
    bairro: "",
    referencia: "",
  });

  const [aberto, setAberto] = useState(true);
  const [mensagemHorario, setMensagemHorario] = useState("");
  const [historico, setHistorico] = useState<Order[]>([]);

  useEffect(() => {
    AOS.init({ duration: 300, easing: "ease-in-out", once: true });
   
    const status = verificarHorarioAtual();
    setAberto(status.aberto);
    setMensagemHorario(status.mensagem);
    carregarHistorico();
  }, []);


  const carregarHistorico = async () => {
    try {
      const pedidos = await db.getOrders();
      setHistorico(pedidos);
    } catch (err) {
      console.error("Erro ao carregar histórico:", err);
      toast.error("Erro ao carregar o histórico!");
    }
  };

  if (!isOpen) return null;

  const handleWhatsAppClick = async () => {
    if (!aberto) {
      toast.error(`⚠️ Estamos fechados! ${mensagemHorario}`);
      return;
    }
    if (items.length === 0) {
      toast.warning("Seu carrinho está vazio!");
      return;
    }
    if (!pedidoTipo) {
      toast.warning("Escolha o tipo de pedido!");
      return;
    }
    if (pedidoTipo === "mesa" && (!mesaSelecionada || !nomeCliente.trim())) {
      if (!mesaSelecionada) toast.warning("Selecione uma mesa!");
      if (!nomeCliente.trim()) toast.warning("Informe o nome do cliente!");
      return;
    }
    if (pedidoTipo === "entrega" && (!endereco.nome || !endereco.rua || !endereco.bairro)) {
      toast.warning("Preencha todos os campos de entrega!");
      return;
    }

    const pedidoData: Order = {
      id_uuid: uuidv4(),
      pedido: items.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total,
      data: new Date(),
      status: "pendente",
      tipo: pedidoTipo,
      mesa: pedidoTipo === "mesa" ? mesaSelecionada : undefined,
      nome_cliente: pedidoTipo === "mesa" ? nomeCliente : endereco.nome,
      observacao,
      endereco: pedidoTipo === "entrega" ? endereco : undefined,
      id_supabase: null,
    };

    try {
      // Salva no Dexie
      const dexieId = await db.saveOrder(pedidoData);

      // Salva no Supabase separadamente
      const { data, error } = await supabase
        .from("pedidos")
        .insert({
          id_uuid:  pedidoData.id_uuid,
          pedido: pedidoData.pedido,
          total: pedidoData.total,
          data: pedidoData.data.toISOString(),
          status: pedidoData.status,
          tipo: pedidoData.tipo,
          mesa: pedidoData.mesa,
          observacao: pedidoData.observacao,
          nome_cliente: pedidoData.nome_cliente,
          endereco: pedidoData.endereco,
        })
        .select("id")
        .single();

      if (error) throw error;

      if (data?.id) {
        await db.updateOrder(dexieId, { id_supabase: data.id });
      }

      toast.success("Pedido salvo e enviado com sucesso!");
      clearCart();
      await carregarHistorico();
    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar pedido!");
    }

    // Formata mensagem WhatsApp
    const itensFormatados = items
      .map((item) => `• ${item.name}\n  Quantidade: ${item.quantity}\n  Valor: R$${item.price.toFixed(2)}`)
      .join("\n\n");

    let infoAdicional = "";
    if (pedidoTipo === "mesa") infoAdicional = `Mesa: ${mesaSelecionada}\nCliente: ${nomeCliente}`;
    if (pedidoTipo === "entrega") infoAdicional = `Nome: ${endereco.nome}\nEndereço: ${endereco.rua}, ${endereco.bairro}\nReferência: ${endereco.referencia}`;

    const mensagem = `Olá! Gostaria de fazer o pedido:\n\n${itensFormatados}\n\nTotal: R$${total.toFixed(
      2
    )}\n${infoAdicional}\nObservação: ${observacao}`;

    const link = `https://wa.me/5531999918730?text=${encodeURIComponent(mensagem)}`;
    window.open(link, "_blank");
  };

  return (
    <Box position="fixed" inset={0} bg="blackAlpha.700" display="flex" alignItems="center" justifyContent="center" zIndex={50} p={4} onClick={onClose}>
      <Box
        data-aos="zoom-in"
        bg="white"
        color="gray.900"
        borderRadius="2xl"
        shadow="2xl"
        w="full"
        maxW="xl"
        maxH="90vh"
        overflowY="auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <Flex align="center" justify="space-between" p={6} borderBottom="1px" borderColor="green.600">
          <Text fontSize="2xl" fontWeight="bold" color="green.600">Meu Carrinho</Text>
          <Button variant="ghost" color="green.600" fontSize="2xl" onClick={onClose}>✕</Button>
        </Flex>

        {/* ALERTA DE FECHADO */}
        {!aberto && (
          <Alert status="error" variant="solid" justifyContent="center">
            <AlertIcon />
            {mensagemHorario || "⚠️ Estamos fechados no momento"}
          </Alert>
        )}

        {/* EMPTY CART */}
        {items.length === 0 ? (
          <Text p={6} textAlign="center" color="gray.500" fontSize="lg">Seu carrinho está vazio.</Text>
        ) : (
          <>
            {/* ITENS */}
            <VStack spacing={2} p={4}>
              {items.map((item) => <CartItemRow key={item.id} item={item} onRemove={removeItem} />)}
            </VStack>

            {/* PEDIDO TIPO */}
            <VStack spacing={4} px={6} py={4} align="start">
              <Text fontWeight="semibold" color="green.600">Tipo de Pedido:</Text>
              <HStack spacing={4} flexWrap="wrap">
                {["mesa", "entrega"].map((tipo) => {
                  const isActive = pedidoTipo === tipo;
                  return (
                    <button
                      key={tipo}
                      onClick={() => setPedidoTipo(tipo as "mesa" | "entrega")}
                      className={`${styles.button} ${isActive ? styles.buttonActive : styles.buttonInactive}`}
                    >
                      {tipo === "mesa" ? "Atendimento em Mesa" : "Entrega"}
                    </button>
                  );
                })}
              </HStack>

              {/* MESAS */}
              {pedidoTipo === "mesa" && (
                <>
                  <Input placeholder="Nome do cliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} focusBorderColor="green.600" />
                  <div className={styles.mesaGrid}>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                      const isSelected = mesaSelecionada === String(num);
                      return (
                        <button key={num} onClick={() => setMesaSelecionada(isSelected ? null : String(num))} className={`${styles.button} ${isSelected ? styles.buttonActive : styles.buttonInactive}`}>Mesa {num}</button>
                      );
                    })}
                  </div>
                </>
              )}

              {/* CAMPOS DE ENTREGA */}
              {pedidoTipo === "entrega" && (
                <VStack spacing={2} mt={2} w="full">
                  {["nome", "rua", "bairro", "referencia"].map((_field) => (
                    <Input
                      key={_field}
                      placeholder={
                        _field === "nome"
                          ? "Nome completo"
                          : _field === "rua"
                          ? "Rua, Número"
                          : _field === "bairro"
                          ? "Bairro"
                          : "Referência (opcional)"
                      }
                      value={endereco[_field as keyof typeof endereco]}
                      onChange={(e) => setEndereco({ ...endereco, [_field]: e.target.value })}
                      focusBorderColor="green.600"
                      borderRadius="md"
                    />
                  ))}
                </VStack>
              )}

              {/* OBSERVAÇÃO */}
              <Textarea placeholder="Observação do pedido (opcional)" value={observacao} onChange={(e) => setObservacao(e.target.value)} focusBorderColor="green.600" borderRadius="md" w="full" mt={2} />
            </VStack>

            {/* TOTAL */}
            <Flex align="center" justify="space-between" p={6} borderTop="1px" borderColor="green.600" bg="green.50">
              <Text fontWeight="semibold" fontSize="xl" color="green.600">Total:</Text>
              <Text color="green.600" fontWeight="bold" fontSize="2xl">R$ {total.toFixed(2)}</Text>
            </Flex>

            {/* BUTTONS */}
            <Flex direction={{ base: "column", sm: "row" }} gap={4} px={6} pb={6}>
              <Button onClick={clearCart} className={`${styles.button} ${styles.limpar}`} w={{ base: "full", sm: "auto" }}>Limpar</Button>
              <Button onClick={handleWhatsAppClick} className={styles.button} w={{ base: "full", sm: "auto" }}>Finalizar no WhatsApp</Button>
              <Button onClick={carregarHistorico} className={styles.button} w={{ base: "full", sm: "auto" }}>Ver Histórico</Button>
              <Button onClick={async () => { await db.clearOrders(); carregarHistorico(); }} className={`${styles.button} ${styles.limpar}`} w={{ base: "full", sm: "auto" }}>Limpar Histórico</Button>
            </Flex>

            {/* HISTÓRICO */}
            {historico.length > 0 && (
              <VStack spacing={2} px={6} py={4} align="start">
                <Text fontWeight="semibold" color="green.600">Histórico de Pedidos</Text>
                <VStack spacing={1} align="start">
                  {historico.map((pedido) => (
                    <Flex key={pedido.id} justify="space-between" w="full" p={2} bg="green.50" borderRadius="md">
                      <Text fontSize="sm" color="gray.700">
                        Pedido #{pedido.id_supabase || pedido.id}: R$ {pedido.total.toFixed(2)} em {formatDateToSaoPaulo(pedido.data)}
                        </Text>
                        <Button size="xs" colorScheme="red" onClick={() => db.deleteOrder(pedido.id!).then(carregarHistorico)}>Excluir</Button>
                    </Flex>
                  ))}
                </VStack>
              </VStack>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default Cart;
