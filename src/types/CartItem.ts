// src/types.ts

export interface CartItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  isCombo: boolean;
  comboQuantity: number;
  isBurger: boolean;
}
