import { frontendUrl } from "@/utils/variables";

export function generateMetadata(data, nofollow, path) {
  const seo = data?.data?.pages?.nodes[0]?.seo;
  const keyWords = data?.data?.pages?.nodes[0]?.seoKeywords?.seoKeywords;

  const sanitizedPath = path?.replace("/index", "");
  const canonicalUrl = `${frontendUrl}${sanitizedPath}`;

  const robotsDirective = nofollow || seo?.metaRobotsNofollow === "nofollow"
    ? { index: false, follow: false }
    : { index: true, follow: true };

  return {
    title: seo?.title || '',
    description: seo?.metaDesc || '',
    keywords: keyWords || '',
    metadataBase: new URL(frontendUrl),
    icons: {
      icon: [
        { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
        { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
      other: [
        { rel: 'manifest', url: '/site.webmanifest' },
      ],
    },
    themeColor: '#ffffff',
    alternates: {
      canonical: canonicalUrl,
    },
    robots: robotsDirective,
    openGraph: {
      title: seo?.title || '',
      description: seo?.opengraphDescription || seo?.metaDesc || '',
      url: canonicalUrl,
      siteName: seo?.opengraphSiteName || '',
      locale: 'en_US',
      type: 'website',
      modifiedTime: seo?.opengraphModifiedTime || '',
      images: [
        {
          url: seo?.opengraphImage?.sourceUrl || '',
          width: 479,
          height: 482,
          type: 'image/webp',
          alt: seo?.opengraphImage?.altText || '',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitterTitle || seo?.title || '',
      description: seo?.twitterDescription || seo?.metaDesc || '',
      images: [seo?.twitterImage?.sourceUrl || seo?.opengraphImage?.sourceUrl || ''],
    },
  };
}