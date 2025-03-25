import BestBrandingAgency from "@/components/Updated/BestBrandingAgency";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 

export const dynamic = "force-dynamic"; // Enable dynamic rendering

const BestBrandingDigitalMarketingPartnerUae = async () => {
  try {
    // PAGE DATA
    const pageData_ = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          pages(where: {id: 3915}) {
            nodes {
              mainContentRepeaterFields {
                title
                description
                image_id
                image_url
              }
              landingPage1 {
                hero {
                  heroTitle
                  heroDesc
                  heroImage {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                  formHeading
                }
                section1 {
                  section1Heading1
                  section1Heading2
                  section1Heading3
                  section1Heading4
                }
                section2 {
                  section2Desc
                  section2Heading
                }
                section3 {
                  section3Desc
                  section3Heading
                  section3Image {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                }
                section4 {
                  section4Desc
                  section4Heading
                  section4Image {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                }
                section5 {
                  section5Desc
                  section5Heading
                  section5Image {
                    node {
                      altText
                      sourceUrl
                    }
                  }
                }
                packageHeading
                faqSection {
                  faqHeading
                  faq
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
              seoKeywords {
                seoKeywords
              }
            }
          }
        }`,
      }),
      cache: "no-store", // Disable caching for dynamic data
    });
    const pageData = await pageData_.json();

    // TESTIMONIAL DATA
    const testimonialsData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          testimonials {
            nodes {
              title
              content
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }`,
      }),
      cache: "no-store", // Disable caching for dynamic data
    });
    const testimonialData = await testimonialsData.json();

    // VIDEOS DATA
    const videos = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          allVideos {
            nodes {
              videosAcf {
                link
              }
              title
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
            }
          }
        }`,
      }),
      cache: "no-store", // Disable caching for dynamic data
    });
    const videosData = await videos.json();

    // PACKAGES DATA
    const packagesData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
          packages(where: {orderby: {order: DESC, field: NAME_IN}}) {
            nodes {
              title
              content
              featuredImage {
                node {
                  altText
                  sourceUrl
                }
              }
              packages {
                description
                features
                price
                subHeading
              }
            }
          }
        }`,
      }),
      cache: "no-store", // Disable caching for dynamic data
    });
    const allPackagesData = await packagesData.json();

    return (
      <BestBrandingAgency
        pageData={pageData}
        testimonialData={testimonialData}
        videosData={videosData}
        allPackagesData={allPackagesData}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data</div>;
  }
};

export default BestBrandingDigitalMarketingPartnerUae;




export async function generateMetadata() {
  const pageData_ = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Posts {
        pages(where: {id: 3915}) {
          nodes {
            mainContentRepeaterFields {
              title
              description
              image_id
              image_url
            }
            landingPage1 {
              hero {
                heroTitle
                heroDesc
                heroImage {
                  node {
                    altText
                    sourceUrl
                  }
                }
                formHeading
              }
              section1 {
                section1Heading1
                section1Heading2
                section1Heading3
                section1Heading4
              }
              section2 {
                section2Desc
                section2Heading
              }
              section3 {
                section3Desc
                section3Heading
                section3Image {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
              section4 {
                section4Desc
                section4Heading
                section4Image {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
              section5 {
                section5Desc
                section5Heading
                section5Image {
                  node {
                    altText
                    sourceUrl
                  }
                }
              }
              packageHeading
              faqSection {
                faqHeading
                faq
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
            seoKeywords {
              seoKeywords
            }
          }
        }
      }`,
    }),
    cache: "no-store", // Disable caching for dynamic data
  });
  const pageData = await pageData_.json();
  
  return generateMetadataFromLib(pageData, false, 'best-branding-agency-dubai');
}