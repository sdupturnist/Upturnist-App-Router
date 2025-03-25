
import Head from "next/head";
import { frontendUrl } from "@/utils/variables";

const SeoDetails = ({ currentPath , keyWords, seo , nofollow}) => {
  console.log(seo)
  return (
            <Head>
              <title>{seo?.title || "Default Title"}</title>
      
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
              <meta name="description" content={seo?.metaDesc || "Default description"} />
              {keyWords && <meta name="keywords" content={keyWords} />}
              <link
                rel="canonical"
                href={`${frontendUrl}${currentPath.replace("/index", "").replace(/\/$/, "")}`}
              />
              <meta
                name="robots"
                content={
                  nofollow || seo?.metaRobotsNofollow === "nofollow"
                    ? "noindex, nofollow"
                    : "index, follow"
                }
              />
              <meta property="og:locale" content="en_US" />
              <meta property="og:type" content="website" />
              <meta property="og:title" content={seo?.title || "Default Title"} />
              <meta
                property="og:description"
                content={seo?.opengraphDescription || "Default Open Graph description"}
              />
              <meta
                property="og:url"
                content={`${frontendUrl}${currentPath.replace("/index", "").replace(/\/$/, "")}`}
              />
              <meta
                property="og:site_name"
                content={seo?.opengraphSiteName || "Default Site Name"}
              />
              <meta
                property="article:modified_time"
                content={seo?.opengraphModifiedTime || ""}
              />
              {seo?.opengraphImage?.sourceUrl && (
                <meta property="og:image" content={seo.opengraphImage.sourceUrl} />
              )}
              <meta property="og:image:width" content="479" />
              <meta property="og:image:height" content="482" />
              <meta property="og:image:type" content="image/webp" />
              <meta name="twitter:card" content="summary_large_image" />
            </Head>
  )
}

export default SeoDetails