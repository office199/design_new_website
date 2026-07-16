import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title = "Ashu Laser Vision - Best Eye Hospital in Andheri Mumbai",
  description = "Ashu Laser Vision is a Super Multi-Specialty Eye & Retina Hospital in Andheri Mumbai. Advanced Cataract, LASIK, Retina treatments by Dr. Shahnawaz Kazi since 2004.",
  keywords = "Eye Hospital Mumbai, Cataract Surgery, LASIK, Retina Specialist",
  image = "/og-image.jpg",
  url = "https://ashulaservision.com",
  type = "website"
}) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
