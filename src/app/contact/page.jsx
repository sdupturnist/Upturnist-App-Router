import Contact from "@/components/Updated/Contact";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 

const ContactInfo = async () => {
  try {
    //HOME PAGE DATA
    const contactData = await fetch(
      wordpressGraphQlApiUrl,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ` query Posts {
          pages(where: {id:821}){
            
          nodes{
            title
              pages{
               subHeading
        heroBanner{
          node{
            altText
            sourceUrl
          }
        }
        heroVideo
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
      {
        cache: "force-cache",
        cache: "no-store",
      }
    );
    const contactPageData = await contactData.json();

    return (
        <Contact
            contactPageData={contactPageData}
        />
    )
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
export default ContactInfo;

export async function generateMetadata() {
  const contactData = await fetch(
    wordpressGraphQlApiUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
        pages(where: {id:821}){
          
        nodes{
          title
            pages{
             subHeading
      heroBanner{
        node{
          altText
          sourceUrl
        }
      }
      heroVideo
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
    {
      cache: "force-cache",
      cache: "no-store",
    }
  );
  const contactPageData = await contactData.json();
  
  return generateMetadataFromLib(contactPageData, false, 'contact');
}

