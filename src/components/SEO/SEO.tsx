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
    <meta name="keywords" content="hamburgueria, Betim, hambúrguer artesanal, The Brothers Burgers" />
    <meta name="author" content="The Brothers Burgers" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={url} />
    <meta property="og:site_name" content="The Brothers Burgers" />
    <meta property="og:type" content="restaurant" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:card" content="summary_large_image" />
  </Helmet>
);

export default SEO;
