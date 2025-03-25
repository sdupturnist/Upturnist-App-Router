import Head from "next/head";
import { frontendUrl } from "@/utils/variables";
import { usePathname } from "next/navigation";


export default function MetatagsServiceSingle({ data }) {


    const seo = data && data?.data?.pages?.nodes[0]?.seo
    const keyWords = data?.data?.pages?.nodes[0].seoKeywords?.seoKeywords

    //console.log(keyWords)

    const currentPath = usePathname();

    //console.log(data?.data?.pages?.nodes[0].seoKeywords?.seoKeywords)

    return (
        <>
            <Head>
                <>


                    <title>{seo && seo?.title}</title>

                    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                    <link rel="manifest" href="/site.webmanifest" />
                    <meta name="msapplication-TileColor" content="#da532c" />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="description" content={seo && seo?.metaDesc} />
                    {keyWords && <meta name="keywords" content={keyWords && keyWords} />}
                    <link rel="canonical" href={(frontendUrl + currentPath)
                        // Remove "index" and optional trailing slash
                    } />

                    <meta name="robots" content={`${seo?.metaRobotsNofollow === 'nofollow' ? 'noindex, nofollow' : 'index, follow'}`} />

                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content={seo && seo?.title} />
                    <meta property="og:description" content={seo && seo?.opengraphDescription} />
                    <meta property="og:url" content={(frontendUrl + currentPath)
                    } />
                    <meta property="og:site_name" content={seo && seo?.opengraphSiteName} />
                    <meta property="article:modified_time" content={seo && seo?.opengraphModifiedTime} />
                    <meta property="og:image" content={seo && seo?.opengraphImage?.sourceUrl} />
                    <meta property="og:image:width" content="479" />
                    <meta property="og:image:height" content="482" />
                    <meta property="og:image:type" content="image/webp" />
                    <meta name="twitter:card" content="summary_large_image" />


                </>
            </Head>
        </>
    )
}