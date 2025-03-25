import Blogs from "@/components/Updated/Blogs";
import {wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 



const BlogInfo = async () => {
  try {
    //BLOG PAGE DATA
    const blogPageData = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
            pages(where: {id:839}) {
              nodes{
                title
                 pages{
                    subHeading
                  }
                     seoKeywords{
          seoKeywords
        }
                    seo {
                    metaRobotsNofollow
                    canonical
focuskw
opengraphSiteName
                        metaDesc
                        metaKeywords
                        title
                        opengraphDescription
                        opengraphSiteName
                        opengraphUrl
                        opengraphImage {
                          altText
                          link
                          sourceUrl
                        }
                        opengraphType
                        opengraphTitle
                        opengraphModifiedTime
                        twitterDescription
                        twitterTitle
                        twitterImage {
                          sourceUrl
                        }
                      }
              }
      }
      }
          `,
        }),
        next: { revalidate: 10 },
      },
    );
    const blogPageDatas = await blogPageData.json();

    //BLOG PAGE DATA
    const blogsData = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
           allBlogs( first: 100 where: {orderby: {order: DESC, field: DATE}}){
              nodes{
                title
                content
                slug
                featuredImage{
                  node{
                    sourceUrl
                    altText
                  }
                }
              }
            }
          }
    
            `,
        }),
        next: { revalidate: 10 },
      },
      {
        cache: "force-cache",
        cache: "no-store",
      }
    );
    const getAllBlogsData = await blogsData.json();

    return (
        <Blogs 
        blogPageDatas = {blogPageDatas}
        getAllBlogsData={getAllBlogsData}
        />
    )
  } catch (error) {
    console.error("Error fetching data:", error);
}
}

export default BlogInfo;

export async function generateMetadata() {
  const blogPageData = await fetch(
    wordpressGraphQlApiUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
          pages(where: {id:839}) {
            nodes{
              title
               pages{
                  subHeading
                }
                   seoKeywords{
        seoKeywords
      }
                  seo {
                  metaRobotsNofollow
                  canonical
focuskw
opengraphSiteName
                      metaDesc
                      metaKeywords
                      title
                      opengraphDescription
                      opengraphSiteName
                      opengraphUrl
                      opengraphImage {
                        altText
                        link
                        sourceUrl
                      }
                      opengraphType
                      opengraphTitle
                      opengraphModifiedTime
                      twitterDescription
                      twitterTitle
                      twitterImage {
                        sourceUrl
                      }
                    }
            }
    }
    }
        `,
      }),
      next: { revalidate: 10 },
    },
  );
  const blogPageDatas = await blogPageData.json();
  
  return generateMetadataFromLib(blogPageDatas, false, 'blogs');
}