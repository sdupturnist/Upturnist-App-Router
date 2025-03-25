import TermsandConditions from "@/components/Updated/TermsandConditions";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 

const TermsAndConditions = async ()=> {

    try {


        const privacyPolicyData = await fetch(
            wordpressGraphQlApiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: ` query Posts {
        pages(where: {id:4187}) {
          nodes{
            title
            content
             pages{
                subHeading
              }
                   seoKeywords{
          seoKeywords
        }
            featuredImage{
            node{
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
  }
          `,
            }),
            next: { revalidate: 10 },
        },
            {
                cache: 'force-cache',
                cache: 'no-store'
            }
        );
        const privacyPolicyData_ = await privacyPolicyData.json();



        return (
            <TermsandConditions
            privacyPolicyData_={privacyPolicyData_}
            />
          )
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
      export default TermsAndConditions;

      export async function generateMetadata() {
        const privacyPolicyData = await fetch(
          wordpressGraphQlApiUrl, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              query: ` query Posts {
      pages(where: {id:4187}) {
        nodes{
          title
          content
           pages{
              subHeading
            }
                 seoKeywords{
        seoKeywords
      }
          featuredImage{
          node{
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
}
        `,
          }),
          next: { revalidate: 10 },
      },
      );
      const privacyPolicyData_ = await privacyPolicyData.json();
  
        return generateMetadataFromLib(privacyPolicyData_, false, 'terms-and-conditions');
      }
