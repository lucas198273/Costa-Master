import { Helmet, HelmetProvider } from "react-helmet-async";

export default function PoliticaEPrivacidade() {
  return (
    <HelmetProvider>
      <main className="min-h-screen bg-white text-gray-800 pt-24 px-6 pb-12 max-w-4xl mx-auto">
        <Helmet>
          <title>Política de Privacidade e Termos de Uso | Soisa Tattoo</title>
          <meta
            name="description"
            content="Entenda como protegemos seus dados no site da Soisa Tattoo. Informações sobre agendamentos, links de afiliado e uso responsável das informações."
          />
          <link rel="canonical" href="https://seusite.com.br/politica" />
        </Helmet>

        <h1 className="text-3xl font-bold mb-6 text-center">
          Política de Privacidade e Termos de Uso
        </h1>

        <section className="space-y-4 text-justify">
          <h2 className="text-xl font-semibold mt-6">1. Coleta de Dados</h2>
          <p>
            Ao utilizar nosso site, alguns dados pessoais poderão ser
            coletados, como nome, telefone, idade e informações relacionadas a
            agendamentos. Essas informações são usadas exclusivamente para
            atendimento e comunicação com os clientes via WhatsApp.
          </p>

          <h2 className="text-xl font-semibold mt-6">2. Uso das Informações</h2>
          <p>
            Os dados fornecidos são utilizados somente internamente, para
            agendamentos de sessões de tatuagem ou piercing, e não são
            compartilhados com terceiros. Prezamos pela segurança e
            confidencialidade dos seus dados.
          </p>

          <h2 className="text-xl font-semibold mt-6">3. Produtos de Afiliados</h2>
          <p>
            Nosso site pode exibir links de afiliados, especialmente de
            produtos voltados ao universo da tatuagem, como equipamentos,
            acessórios e materiais profissionais. Quando você clica nesses
            links e realiza uma compra na Amazon, podemos receber uma pequena
            comissão sem custo adicional para você.
          </p>
          <p>
            Informamos que **não processamos nenhum tipo de pagamento em nosso
            site**. As compras são realizadas diretamente na Amazon ou os
            agendamentos são fechados exclusivamente através do nosso{" "}
            <strong>WhatsApp comercial</strong>.
          </p>

          <h2 className="text-xl font-semibold mt-6">4. Cookies</h2>
          <p>
            Utilizamos cookies para melhorar a navegação no site e oferecer uma
            melhor experiência ao usuário. Você pode configurar seu navegador
            para recusar o uso de cookies, se preferir.
          </p>

          <h2 className="text-xl font-semibold mt-6">5. Direitos do Usuário</h2>
          <p>
            Em conformidade com a LGPD, você pode solicitar, a qualquer momento,
            o acesso, atualização ou exclusão dos seus dados pessoais. Para
            isso, entre em contato conosco pelo WhatsApp.
          </p>

          <h2 className="text-xl font-semibold mt-6">6. Termos de Uso</h2>
          <p>
            O conteúdo disponível neste site, incluindo imagens, textos e
            layout, é de propriedade do Soisa Tattoo e está protegido por leis
            de direitos autorais. A reprodução sem autorização é proibida.
          </p>

          <h2 className="text-xl font-semibold mt-6">7. Alterações na Política</h2>
          <p>
            Esta política poderá ser modificada a qualquer momento para
            refletir atualizações legais ou melhorias no site. Recomendamos que
            você consulte esta página periodicamente.
          </p>

          <p className="text-sm text-center mt-8 text-gray-500">
            Última atualização: Julho de 2025
          </p>
        </section>
      </main>
    </HelmetProvider>
  );
}
