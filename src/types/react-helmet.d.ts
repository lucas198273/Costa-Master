declare module 'react-helmet' {
  import { Component, ReactNode } from 'react';

  export interface MetaProps {
    name?: string;
    content?: string;
    property?: string;  // para meta tags Open Graph (og:title, og:description)
    httpEquiv?: string;
    charset?: string;
  }

  export interface LinkProps {
    rel?: string;
    href?: string;
    type?: string;
    sizes?: string;
  }

  export interface ScriptProps {
    src?: string;
    type?: string;
    async?: boolean;
    defer?: boolean;
    innerHTML?: string;
  }

  export interface HelmetProps {
    title?: string;
    titleTemplate?: string;       // ex: "%s | Soisa Tattoo Studio"
    defaultTitle?: string;
    htmlAttributes?: Record<string, string>;  // ex: { lang: "pt-BR" }
    bodyAttributes?: Record<string, string>;
    meta?: MetaProps[];
    link?: LinkProps[];
    script?: ScriptProps[];
    noscript?: ReactNode | ReactNode[];
    base?: { href?: string; target?: string };
  }

  export class Helmet extends Component<HelmetProps> {}
  export default Helmet;
}
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
