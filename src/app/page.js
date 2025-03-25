import NewHome from "@/components/Updated/NewHome";
import {
  wordpressGraphQlApiUrl,
  wordpressRestApiUrlWordpressMenus,
} from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; // Import with alias




const Home = async () => {
  try {
    //HOME PAGE DATA
    const homeData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
  pages(where: {title: "home"}) {
    nodes {
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
      pages{
        heroVideo
      }
      homePage {
        heroVideoImage{
          node{
            altText
            sourceUrl
          }
        }
        aboutImageDark{
          node{
            altText
            sourceUrl
          }
        }
           aboutImageLight{
          node{
            altText
            sourceUrl
          }
        }
           seoVisibilityReportImageLight{
          node{
            altText
            sourceUrl
          }
        }
           specialzeImageLight{
          node{
            altText
            sourceUrl
          }
        }
        services1ImageLight{
          node{
            altText
            sourceUrl
          }
        }
           about2PhotoLight{
          node{
            altText
            sourceUrl
          }
        }
        aboutBottom2
        aboutBottom2Content
        aboutBottom2
        aboutBottom2Image {
          node {
            altText
            sourceUrl
          }
        }
        aboutHeadingTop
        aboutHeadingTopTwo
        about2Description
        about2Heading
        about2Photo {
          node {
            altText
            sourceUrl
          }
        }
        
        aboutCta1
        aboutCta1Desc
        aboutCta2
        aboutCta2Desc
        aboutCta4
       aboutCta4Desc
        aboutCta4Desc4_2
        aboutDescription
        aboutDescription2
        aboutHeading
        heroTitle
        services2Description
        heroCtaLabel
        downloadHeading
        downloadHeadingCta
        heroDescription
        heroAnimatedHeading
        heroCtaLabel
        ourWorksHeading
        seoVisibilityReportHeading1
        seoVisibilityReportHeading2
        seoVisibilityReportHeadingCtaLabel
        seoVisibilityReportHeadingDescription
        faqHeading
        faq
        specialzeHeading
        specialzeDesc
        homeMenu1
        homeMenu2
        specialzeImage {
          node {
            sourceUrl
            altText
          }
        }
        seoVisibilityReportImage {
          node {
            altText
            sourceUrl
          }
        }
        seoVisibilityReportVideo
        services1Description
        services1Image {
          node {
            altText
            sourceUrl
          }
        }
        services2Heading
        servicesListHeading
        servicesListHeading2
        testimonialHeading
        whoWeAreHeading
        services1Heading
      }
    }
  }
}
          `,
      }),
      next: { revalidate: 10 },
    });
     const homePageData = await homeData.json();

    //MORE SERVICES DATA
    const moreServiceData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
        moreServices{
         nodes{
           title
           content
          featuredImage{
            node{
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
    });
    const moreServicesDatas = await moreServiceData.json();

    //WHO WE ARE DATA
    const whoWeAreData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
        allWhoWeAre{
         nodes{
           title
           content
          featuredImage{
            node{
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
    });
    const whoWeAreDatas = await whoWeAreData.json();

    //WORKS DATA
    const workData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
        works {
          nodes {
            title
            content
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
    });
    const worksData = await workData.json();

    //TESTIMONIAL DATA
    const testimonialsData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
      testimonials{
       nodes{
         title
         content
        featuredImage{
          node{
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
    });
    const testimonialData = await testimonialsData.json();

    //SERVICES HOME LIST DATA
    const serviceListHomeData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query Posts {
  allServiceListHome(where: {orderby: {order: ASC, field: MENU_ORDER}}){
    nodes{
      title
      content
      featuredImage{
        node{
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
    });
    const serviceListHomeData_ = await serviceListHomeData.json();

    //VIDEOS DATA
    const videos = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
    allVideos {
      nodes {
        videosAcf {
          videoPreview{
            node{
              
              mediaItemUrl
            }
          }
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
    });
    const videosData = await videos.json();

    //CONTACT DATA
    const contact = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
contact {
nodes {
  contact {
    heading
    address
    email
    facebook
    fieldGroupName
    instagram
    linkedin
    phone
    twitter
    whatsapp
       youtube
       tiktok
  }
}
}
}
    `,
      }),
      next: { revalidate: 10 },
    });
    const contactData = await contact.json();

    const _homeMenus1 = await fetch(
      `${wordpressRestApiUrlWordpressMenus}menus/perception-branding`
    );
    const _homeMenus2 = await fetch(
      `${wordpressRestApiUrlWordpressMenus}menus/funnel-marketing`
    );
    const _primaryMenu = await fetch(
      `${wordpressRestApiUrlWordpressMenus}menus/primary-menu`
    );
    const _sitmapMenu = await fetch(
      `${wordpressRestApiUrlWordpressMenus}menus/sitmap-menu`
    );
    const _brandingMenu = await fetch(
      `${wordpressRestApiUrlWordpressMenus}menus/branding-menu`
    );
    const _funnelmarketingMenu = await fetch(
      `${wordpressRestApiUrlWordpressMenus}menus/funnelmarketing-menu`
    );

    const homeMenus1_ = await _homeMenus1.json();
    const homeMenus2_ = await _homeMenus2.json();
    const primaryMenu_ = await _primaryMenu.json();
    const sitmapMenu_ = await _sitmapMenu.json();
    const brandingMenu_ = await _brandingMenu.json();
    const funnelmarketingMenu_ = await _funnelmarketingMenu.json();


    return (
      <>
        
      
        <NewHome
          homePageData={homePageData}
          moreServicesDatas={moreServicesDatas}
          whoWeAreDatas={whoWeAreDatas}
          worksData={worksData}
          testimonialData={testimonialData}
          serviceListHomeData_={serviceListHomeData_}
          videosData={videosData}
          contactData={contactData}
          homeMenus1_={homeMenus1_}
          homeMenus2_={homeMenus2_}
          primaryMenu_={primaryMenu_}
          sitmapMenu_={sitmapMenu_}
          brandingMenu_={brandingMenu_}
          funnelmarketingMenu_={funnelmarketingMenu_}
        />
        
      </>
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        homePageData: {},
        moreServicesDatas: {},
        whoWeAreDatas: {},
        worksData: {},
        testimonialData: {},
        serviceListHomeData_: {},
        videosData: {},
      },
      revalidate: 10, // ISR: Still set a revalidate time even on error
    };
  }
};

export default Home;


export async function generateMetadata() {
  // Fetch SEO data
  const homeData = await fetch(wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query Posts {
        pages(where: {title: "home"}) {
          nodes {
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
    next: { revalidate: 10 },
  });
  
  const homePageData = await homeData.json();
  return generateMetadataFromLib(homePageData, false, '');
}