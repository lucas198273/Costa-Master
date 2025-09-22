import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  image: string;
  url: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, url }) => (
  <Helmet prioritizeSeoTags>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content="bicicletas, loja de bicicletas, bicicletas em Ibirité, venda de bicicletas, bicicletas Costa, manutenção de bicicletas" />
    <meta name="author" content="Bicicletas Costa" />

    {/* Open Graph / Facebook */}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content="Bicicletas Costa" />
    <meta property="og:type" content="website" />

    {/* Twitter */}
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />

    {/* SEO local para Ibirité, MG */}
    <meta name="geo.region" content="BR-MG" />
    <meta name="geo.placename" content="Ibirité" />
    <meta name="geo.position" content="-19.9675;-43.9442" />
    <meta name="ICBM" content="-19.9675, -43.9442" />
  </Helmet>
);

export default SEO;
