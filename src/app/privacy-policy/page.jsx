import PrivacyPolicyInfo from "@/components/Updated/PrivacyPolicyInfo";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata";




const PrivacyPolicy = async () => {

  try {


    const privacyPolicyData = await fetch(
      wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: ` query Posts {
        pages(where: {id:3}) {
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
      <PrivacyPolicyInfo
        privacyPolicyData_={privacyPolicyData_}
      />
    )
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
export default PrivacyPolicy;




export async function generateMetadata() {

  const privacyPolicyData = await fetch(
    wordpressGraphQlApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: ` query Posts {
pages(where: {id:3}) {
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
  }
  );
  const privacyPolicyDataInfo = await privacyPolicyData.json();

  return generateMetadataFromLib(privacyPolicyDataInfo, false, 'privacy-policy');
}