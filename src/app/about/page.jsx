import WhoWeAre from "@/components/Updated/About";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata";

const About = async () => {
  try {
    //ABOUT PAGE DATA
    const aboutData = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
  pages(where: {id: 798}) {
    nodes {
      title
      pages{
        heroBanner{
          node{
            altText
            sourceUrl
          }
        }
        heroVideo
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
      pages {
        subHeading
      }
      seoKeywords {
        seoKeywords
      }
      aboutUs {
        aboutDescription1
        aboutDescription2
        journeyHeading
        timeline
        approchHeading
        approachContent
        approchBanner {
          node {
            sourceUrl
            altText
          }
        }
        aboutBottomHeading
        aboutBottomDescription
        marketingStrategy {
          node {
            altText
            sourceUrl
          }
        }
        coreValuesHeading
        coreValuesDescription
        deliveryMethodHeading
        deliveryMethodDescription
        teamHeading
        videoHeading
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
    const aboutPageData = await aboutData.json();

    //CORE VALUES DATA
    const coreValues = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
          allCoreValues{
           nodes{
             title
             content
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
    const coreValuesData = await coreValues.json();

    //DELIVERY METHOD DATA
    const deliveryMethod = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `   query Posts {
              allDeliveryMethod(where: {orderby: {order: DESC, field: NAME_IN}}) {
               nodes{
                 title
                 content
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
    const deliveryMethodData = await deliveryMethod.json();

    //TEAMS DATA
    const teams = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
              teams(where: {orderby: {order: DESC, field: NAME_IN}}) {
                nodes {
                  title
                  content
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
                 teamAcf{
                  position
                  intrested
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
    const teamsData = await teams.json();

    //TIMELINE DATA
    const timline = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
              allTimeLine(where: {orderby: {order: DESC, field: NAME_IN}}) {
                nodes {
                  title
                  content
                  featuredImage {
                    node {
                      sourceUrl
                      altText
                    }
                  }
               timeLineAcf{
                website
                year
                soon
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
    const timelineData = await timline.json();

    //VIDEOS DATA
    const videos = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
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
    const videosData = await videos.json();

    return (
      <WhoWeAre
        aboutPageData={aboutPageData}
        coreValuesData={coreValuesData}
        deliveryMethodData={deliveryMethodData}
        teamsData={teamsData}
        timelineData={timelineData}
        videosData={videosData}
      />
    )
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export default About;

export async function generateMetadata() {
  // Fetch SEO data
  const aboutData = await fetch(
    wordpressGraphQlApiUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
pages(where: {id: 798}) {
  nodes {
    title
    pages{
      heroBanner{
        node{
          altText
          sourceUrl
        }
      }
      heroVideo
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
    pages {
      subHeading
    }
    seoKeywords {
      seoKeywords
    }
    aboutUs {
      aboutDescription1
      aboutDescription2
      journeyHeading
      timeline
      approchHeading
      approachContent
      approchBanner {
        node {
          sourceUrl
          altText
        }
      }
      aboutBottomHeading
      aboutBottomDescription
      marketingStrategy {
        node {
          altText
          sourceUrl
        }
      }
      coreValuesHeading
      coreValuesDescription
      deliveryMethodHeading
      deliveryMethodDescription
      teamHeading
      videoHeading
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
  const aboutPageData = await aboutData.json();
  return generateMetadataFromLib(aboutPageData, false, 'about');
}