import { createContext, useContext, useReducer, type ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  comboQuantity: number;
  isCombo: boolean;
  isBurger: boolean;
  imageUrl: string;
}

export type PedidoTipo = "mesa" | "entrega" | null;

interface CartState {
  items: CartItem[];
  total: number;
  totalCombos: number;
  pedidoTipo: PedidoTipo;
  mesaNumero: number | null;
  isCartOpen: boolean;
  imageUrl: string | null;
}

type CartAction =
  | { type: "ADD_ITEM"; item: Omit<CartItem, "quantity" | "comboQuantity" | "isCombo" | "isBurger">; isBurger: boolean }
  | { type: "REMOVE_ITEM"; id: string }
  | { type: "INCREMENT_QUANTITY"; id: string }
  | { type: "DECREMENT_QUANTITY"; id: string }
  | { type: "ADD_COMBO"; id: string }
  | { type: "REMOVE_COMBO"; id: string }
  | { type: "CLEAR_CART" }
  | { type: "SET_PEDIDO_TIPO"; pedidoTipo: PedidoTipo }
  | { type: "SET_MESA_NUMERO"; mesaNumero: number }
  | { type: "TOGGLE_CART"; isOpen: boolean };

const initialState: CartState = {
  items: [],
  total: 0,
  totalCombos: 0,
  pedidoTipo: null,
  mesaNumero: null,
  isCartOpen: false,
  imageUrl: null,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((i) => i.id === action.item.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = state.items.map((i) =>
          i.id === action.item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        newItems = [
          ...state.items,
          { ...action.item, quantity: 1, comboQuantity: 0, isCombo: false, isBurger: action.isBurger },
        ];
      }
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        totalCombos: calculateTotalCombos(newItems),
      };
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((i) => i.id !== action.id);
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        totalCombos: calculateTotalCombos(newItems),
      };
    }

    case "INCREMENT_QUANTITY": {
      const newItems = state.items.map((i) =>
        i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        totalCombos: calculateTotalCombos(newItems),
      };
    }

    case "DECREMENT_QUANTITY": {
      const newItems = state.items.map((i) =>
        i.id === action.id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
      );
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        totalCombos: calculateTotalCombos(newItems),
      };
    }

    case "ADD_COMBO": {
      const newItems = state.items.map((i) => {
        if (i.id === action.id && i.quantity > i.comboQuantity) {
          return { ...i, comboQuantity: i.comboQuantity + 1, isCombo: true };
        }
        return i;
      });
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        totalCombos: calculateTotalCombos(newItems),
      };
    }

    case "REMOVE_COMBO": {
      const newItems = state.items.map((i) => {
        if (i.id === action.id && i.comboQuantity > 0) {
          const newComboQuantity = i.comboQuantity - 1;
          return { ...i, comboQuantity: newComboQuantity, isCombo: newComboQuantity > 0 };
        }
        return i;
      });
      return {
        ...state,
        items: newItems,
        total: calculateTotal(newItems),
        totalCombos: calculateTotalCombos(newItems),
      };
    }

    case "CLEAR_CART":
      return { ...state, items: [], total: 0, totalCombos: 0 };

    case "SET_PEDIDO_TIPO":
      return { ...state, pedidoTipo: action.pedidoTipo };

    case "SET_MESA_NUMERO":
      return { ...state, mesaNumero: action.mesaNumero };

    case "TOGGLE_CART":
      return { ...state, isCartOpen: action.isOpen };

    default:
      return state;
  }
};

// Totais
const calculateTotal = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.price * item.quantity + item.comboQuantity * 12.9, 0);

const calculateTotalCombos = (items: CartItem[]) =>
  items.reduce((sum, item) => sum + item.comboQuantity * 12.9, 0);

interface CartContextData extends CartState {
  addItem: (item: Omit<CartItem, "quantity" | "comboQuantity" | "isCombo" | "isBurger">, isBurger: boolean) => void;
  removeItem: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
  addCombo: (id: string) => void;
  removeCombo: (id: string) => void;
  clearCart: () => void;
  setPedidoTipo: (tipo: PedidoTipo) => void;
  setMesaNumero: (numero: number) => void;
  toggleCart: (isOpen: boolean) => void;
  openCart: () => void; // Adicionado
  closeCart: () => void; // Adicionado
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const openCart = () => dispatch({ type: "TOGGLE_CART", isOpen: true });
  const closeCart = () => dispatch({ type: "TOGGLE_CART", isOpen: false });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (item, isBurger) => dispatch({ type: "ADD_ITEM", item, isBurger }),
        removeItem: (id) => dispatch({ type: "REMOVE_ITEM", id }),
        incrementQuantity: (id) => dispatch({ type: "INCREMENT_QUANTITY", id }),
        decrementQuantity: (id) => dispatch({ type: "DECREMENT_QUANTITY", id }),
        addCombo: (id) => dispatch({ type: "ADD_COMBO", id }),
        removeCombo: (id) => dispatch({ type: "REMOVE_COMBO", id }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        setPedidoTipo: (tipo) => dispatch({ type: "SET_PEDIDO_TIPO", pedidoTipo: tipo }),
        setMesaNumero: (numero) => dispatch({ type: "SET_MESA_NUMERO", mesaNumero: numero }),
        toggleCart: (isOpen) => dispatch({ type: "TOGGLE_CART", isOpen }),
        openCart, // Adicionado
        closeCart, // Adicionado
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
