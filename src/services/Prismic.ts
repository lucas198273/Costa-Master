import * as prismic from "@prismicio/client";

// 🔁 Substitua pelo nome do seu repositório (ex: 'meu-repo')
const repositoryName = "blob";

// ✅ Cria o cliente com a URL do endpoint
export const client = prismic.createClient(repositoryName, {
  // Opcional: se tiver token de acesso, adicione aqui
  accessToken: "MC5hR01seUJBQUFDUUFPWUY5.Q--_ve-_ve-_vQfvv73vv73vv71K77-9AVhc77-9YO-_vSR4bGPvv70k77-977-977-977-977-977-9Cm8h77-9",

  // Se quiser configurar fetch (útil em SSR)
  // fetch: fetch,
});
