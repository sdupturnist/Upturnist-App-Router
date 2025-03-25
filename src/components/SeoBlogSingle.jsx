import Head from "next/head";
import { frontendUrl } from "@/utils/variables";
import { usePathname } from "next/navigation";

export default function MetatagsBlogSingle({ data }) {
  const seo = data[0]?.data?.allBlogs?.nodes[0]?.seo;
  const keyWords = data[0]?.data?.allBlogs?.nodes[0]?.seoKeywords?.seoKeywords;

  const currentPath = usePathname(); // usePathname returns the current path as a string

  return (
    <div>
      <Head>
        <>
          <title>{seo?.title}</title>

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content="#ffffff" />
          <meta name="description" content={seo?.metaDesc && seo?.metaDesc} />
          {keyWords && <meta name="keywords" content={keyWords && keyWords} />}
          <link
            rel="canonical"
            href={
              currentPath
                ? frontendUrl + currentPath.replace("/index", "")
                : frontendUrl
              // Remove "index" and optional trailing slash
            }
          />
          <meta
            name="robots"
            content={`${
              seo?.metaRobotsNofollow === "nofollow"
                ? "noindex, nofollow"
                : "index, follow"
            }`}
          />
          <meta property="og:locale" content="en_US" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={seo?.title && seo?.title} />
          <meta
            property="og:description"
            content={seo?.opengraphDescription && seo?.opengraphDescription}
          />
          <meta
            property="og:url"
            content={
              currentPath
                ? frontendUrl + currentPath
                : frontendUrl
              // Remove "index" and optional trailing slash
            }
          />
          <meta
            property="og:site_name"
            content={seo?.opengraphSiteName && seo?.opengraphSiteName}
          />
          <meta
            property="article:modified_time"
            content={seo?.opengraphModifiedTime && seo?.opengraphModifiedTime}
          />
          <meta
            property="og:image"
            content={
              seo?.opengraphImage.sourceUrl && seo?.opengraphImage.sourceUrl
            }
          />
          <meta property="og:image:width" content="479" />
          <meta property="og:image:height" content="482" />
          <meta property="og:image:type" content="image/webp" />
          <meta name="twitter:card" content="summary_large_image" />
        </>
      </Head>
    </div>
  );
}