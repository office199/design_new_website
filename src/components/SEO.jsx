import { Helmet } from 'react-helmet-async';

/**
 * SEO Component - Fully optimized for Ashu Laser Vision
 * Supports title, description, keywords, canonical, OG, Twitter, JSON-LD
 */
export default function SEO({
  title = "Ashu Laser Vision - Best Eye Hospital in Andheri Mumbai | Cataract, LASIK & Retina Specialist",
  description = "Ashu Laser Vision is a Super Multi-Specialty Eye & Retina Hospital in Andheri Mumbai since 2004. Led by Dr. Shahnawaz Kazi - FMRF Sankara, FRCS Glasgow, Gold Medalist. Advanced Cataract, LASIK Contoura SMILE, Retina, Glaucoma, Diabetic Retinopathy, Pediatric Squint care with 50K+ surgeries.",
  keywords = "Eye Hospital Mumbai, Best Eye Hospital Andheri, Cataract Surgery Mumbai, LASIK Surgery Mumbai, Retina Specialist Mumbai, Glaucoma Treatment Mumbai, Diabetic Retinopathy Mumbai, Pediatric Eye Doctor Mumbai, Squint Surgery Mumbai, Ashu Laser Vision, Dr Shahnawaz Kazi",
  image = "https://ashulaservision.com/wp-content/uploads/2024/11/banner-home.jpg",
  url = "https://ashulaservision.com/",
  type = "website",
  jsonLd = null,
  noIndex = false,
  author = "Ashu Laser Vision",
  publishedTime = null,
  modifiedTime = null,
  breadcrumbs = null,
  faqSchema = null
}) {
  const canonical = url;
  const defaultJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Ashu Laser Vision - Super Multi Specialty Eye & Retina Hospital",
    "alternateName": "Ashu Eye Hospital",
    "image": [
      "https://ashulaservision.com/wp-content/uploads/2024/11/banner-home.jpg",
      "https://ashulaservision.com/wp-content/uploads/2024/11/about-h.jpg"
    ],
    "description": description,
    "url": "https://ashulaservision.com",
    "telephone": "+91-9322364002",
    "email": "info@ashulaservision.com",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "701/2/3, Pearl Plaza Bldg, Opp. Andheri Railway Platform No. 1, Next to McDonald's",
        "addressLocality": "Andheri West",
        "addressRegion": "Mumbai, Maharashtra",
        "postalCode": "400058",
        "addressCountry": "IN"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Ashu Eye Hospital, Yari Road, Versova",
        "addressLocality": "Andheri West",
        "addressRegion": "Mumbai",
        "addressCountry": "IN"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 19.136,
      "longitude": 72.829
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "23:59",
        "description": "Emergency 24x7"
      }
    ],
    "founder": {
      "@type": "Person",
      "name": "Dr. Shahnawaz Kazi",
      "jobTitle": "Retina, Cataract & Refractive Surgeon",
      "honorificSuffix": "FMRF, FRCS (Glasgow), FCPS (Gold Medalist), FICO (UK), DNB",
      "alumniOf": ["Sankara Nethralaya Chennai", "FRCS Glasgow"],
      "hasCredential": ["FMRF","FRCS","FCPS Gold Medal","FICO UK","DNB"]
    },
    "medicalSpecialty": ["Ophthalmology","Retina","Cataract Surgery","Refractive Surgery","Glaucoma","Pediatric Ophthalmology","Cornea","Oculoplasty"],
    "availableService": [
      {"@type": "MedicalProcedure", "name": "Cataract Surgery - Phaco & Femto with Premium IOL"},
      {"@type": "MedicalProcedure", "name": "LASIK Contoura SMILE ASA ICL Refractive Surgery"},
      {"@type": "MedicalProcedure", "name": "Retinal Detachment Vitrectomy Scleral Buckle"},
      {"@type": "MedicalProcedure", "name": "Diabetic Retinopathy Laser Anti-VEGF"},
      {"@type": "MedicalProcedure", "name": "Glaucoma AGV GATT MIGS SLT"},
      {"@type": "MedicalProcedure", "name": "Pediatric Squint Myopia Control ROP"}
    ],
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1200",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const combinedJsonLd = jsonLd ? [defaultJsonLd, jsonLd] : defaultJsonLd;

  // FAQ Schema if provided
  const faqJson = faqSchema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqSchema.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  } : null;

  const breadcrumbJson = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((b,i)=>({
      "@type": "ListItem",
      "position": i+1,
      "name": b.name,
      "item": b.url
    }))
  } : null;

  return (
    <Helmet>
      {/* Basic */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large, max-snippet:-1"} />
      <link rel="canonical" href={canonical} />

      {/* Viewport already in index.html */}

      {/* Open Graph */}
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Ashu Laser Vision" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ashulaservision" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo / Local SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Andheri West, Mumbai" />
      <meta name="geo.position" content="19.136;72.829" />
      <meta name="ICBM" content="19.136, 72.829" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(Array.isArray(combinedJsonLd) ? combinedJsonLd : [combinedJsonLd])}
      </script>
      {faqJson && (
        <script type="application/ld+json">{JSON.stringify(faqJson)}</script>
      )}
      {breadcrumbJson && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbJson)}</script>
      )}

      {/* Preconnects for speed */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://images.unsplash.com" />
    </Helmet>
  );
}
