# Image sources

The website uses the clinic's real logo, doctor/clinic photography, and service artwork from the existing Ashu Laser Vision website instead of generic stock photography.

## Locally optimized assets

| Local asset | Original source |
| --- | --- |
| `public/images/ashu-logo.png` and `ashu-logo-mark.png` | `https://ashulaservision.com/wp-content/uploads/2024/09/logo.png` |
| `public/images/clinic/hero-consultation.webp` and `hero-og.jpg` | `https://ashulaservision.com/wp-content/uploads/2024/11/banner-home.jpg` |
| `public/images/clinic/about-exam.webp` | `https://ashulaservision.com/wp-content/uploads/2024/11/about-hdr-1.jpg` |
| `public/images/clinic/retina-diagnostic.webp` | `https://ashulaservision.com/wp-content/uploads/2025/11/FFA.jpg` |
| `public/images/clinic/interior.webp` | `https://ashulaservision.com/wp-content/uploads/2025/07/ashu-blog-1.jpg` |
| `public/images/clinic/laser-surgery.webp` | `https://ashulaservision.com/wp-content/uploads/2024/10/blog-image-2.jpg` |
| `public/images/clinic/laser-system.webp` | `https://ashulaservision.com/wp-content/uploads/2025/06/lasik-banner-blog-1.jpg` |
| `public/images/clinic/laser-exam.webp` | `https://ashulaservision.com/wp-content/uploads/2024/11/banner-blog-7.jpg` |
| `public/images/services/cataract.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/Cataract-1.jpg` |
| `public/images/services/lasik.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/LASIK.jpg` |
| `public/images/services/glaucoma.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/glaucoma.jpg` |
| `public/images/services/retina-laser.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/Laser-for-retina-and-glaucoma.jpg` |
| `public/images/services/pediatric.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/Kids-Eye-Problem-.jpg` |
| `public/images/services/cornea.webp` | `https://ashulaservision.com/wp-content/uploads/2022/09/Advanced-Surface-Laser-Ablation_.jpg` |
| `public/images/services/eye-tumors.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/Eye-Tumors-1.jpg` |
| `public/images/services/squint.webp` | `https://ashulaservision.com/wp-content/uploads/2021/06/Squint.jpg` |

The remaining service thumbnails in `src/data/content.js` point directly to the clinic's original WordPress media library. Local files were converted to WebP where appropriate, stripped of metadata, and retained at useful responsive dimensions.
