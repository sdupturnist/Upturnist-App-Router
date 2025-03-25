import BlogsSinglePage from "@/components/Updated/BlogsSinglePage";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 


const blogsSingle = async (context) => {
  const { params } = await context;
  const { slug } = await params;

  try {
    // Fetch the blog data based on slug
    const blogData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          allBlogs(where: {name: "${slug}"}) {
            nodes {
              title
              date
              content
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
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
        }`,
      }),
    });
    const singleBLogsData = await blogData.json();

    // Check if the blog data exists, otherwise return notFound
    // if (!singleBLogsData?.data?.allBlogs?.nodes.length) {
    //   return {
    //     notFound: true,
    //   };
    // }

    // Fetch the static page data
    const pageData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          pages(where: {id: 839}) {
            nodes {
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              seo {
                canonical
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
        }`,
      }),
    });
    const blogSinglePageData = await pageData.json();

    // Fetch all blogs for the "More blogs" section
    const blogsData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          allBlogs(first: 4) {
            nodes {
              title
              content
              slug
              featuredImage {
                node {
                  sourceUrl
                  altText
                }
              }
            }
          }
        }`,
      }),
    });
    const getAllBlogsData = await blogsData.json();

    return (
      <BlogsSinglePage 
      singleBLogsData ={singleBLogsData}
      blogSinglePageData={blogSinglePageData}
      getAllBlogsData={getAllBlogsData}
      />
    )
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      notFound: true,
    };
  }
}

export async function getStaticPaths() {
  try {
    // Fetch all blog slugs
    const res = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query {
          allBlogs {
            nodes {
              slug
            }
          }
        }`,
      }),
    });

    const data = await res.json();
    const allBlogs = data?.data?.allBlogs?.nodes ?? [];

    // Map slugs to paths
    const paths = allBlogs.map(blog => ({
      params: { slug: blog.slug },
    }));

    return {
      paths,
      fallback: 'blocking', // or 'false' to generate pages at build time
    };
  } catch (error) {
    console.error('Error fetching paths:', error);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
}
export default blogsSingle;


export async function generateMetadata(context) {
  const { params } = await context;
  const { slug } = await params;

    const blogData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          allBlogs(where: {name: "${slug}"}) {
            nodes {
              title
              date
              content
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
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
        }`,
      }),
    });
    const singleBLogsData = await blogData.json();
  
  return generateMetadataFromLib(singleBLogsData, false, `blogs/${slug}`);
}