import Services from "@/components/Updated/Services";
import { wordpressGraphQlApiUrl } from "@/utils/variables";
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 



const ServicePath = async () => {
  async function fetchServices() {
    try {
      const res = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              pages {
                nodes {
                  name
                }
              }
            }
          `,
        }),
        cache: "no-store",
      });

      const data = await res.json();
      return data?.data?.pages?.nodes ?? []; // Return an empty array if nodes are undefined
    } catch (error) {
      console.error("Error fetching services:", error);
      return []; // Return an empty array in case of error
    }
  }

  // Fetch services and create paths
  const services = await fetchServices();

  // Ensure services is defined and not null
  const paths =
    services.length > 0
      ? services.map((service) => ({
          params: { service: service.name }, // Maps the 'name' of each service to the dynamic segment
        }))
      : [];

  return {
    paths, // List of dynamic paths to be statically generated
    fallback: "blocking", // This ensures that the page will be generated at request time if the path isn't pre-rendered
  };
}




const servicesPageData = async (context)=> {
  const { params } = await context;
  const { service } = await params;

  try {
    // Fetch service page data
    const serviceData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query {
            pages(where: {name: "${service}"}) {
              nodes {
                title
                content
                mainContentRepeaterFields {
                  title
                  description
                  image_id
                  image_url
                  image_alt
                }
                additionalServicesRepeaterFields{
                  title
                  description
                  image_id
                  image_url
                  image_alt
                }
                pages {
                  headingAdditionlaServices
                  subHeading
                  faqheadingcommon
                  faqCommon
                }
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
          }
        `,
      }),
      cache: "no-store",
    });

    const servicePageData = await serviceData.json();

    // Check if the page data is available, if not, use fallback data
    const pageData = servicePageData?.data?.pages?.nodes[0] || null;

    // If no data found for the page, return a default fallback object
    if (!pageData) {
      console.warn(`No data found for service: ${service}`);
      return {
        props: {
          servicePageData: null,  // You can set it to null or empty data if needed
          allPackagesData: null,
        },
        revalidate: 60, // Keep ISR enabled
      };
    }

    // Fetch package data
    const packagesData = await fetch(wordpressGraphQlApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          query Posts {
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
          }
        `,
      }),
      cache: "no-store",
    });
    
    const allPackagesData = await packagesData.json();

    return(
        <Services 
        servicePageData = {servicePageData}
        allPackagesData = {allPackagesData}
        />
    )
  } catch (error) {
    console.error("Error fetching data:", error);

    // Instead of triggering 404, return fallback data
    return {
      props: {
        servicePageData: null,  // You can set it to null or empty data if needed
        allPackagesData: null,  // You can set this to null or empty data
      },
      revalidate: 60, // Keep ISR enabled
    };
  }
}

export default servicesPageData;


export async function generateMetadata(context) {
    const { params } = await context;
    const { service } = await params;
  
      // Fetch service page data
      const serviceData = await fetch(wordpressGraphQlApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `
            query {
              pages(where: {name: "${service}"}) {
                nodes {
                  title
                  content
                  mainContentRepeaterFields {
                    title
                    description
                    image_id
                    image_url
                    image_alt
                  }
                  additionalServicesRepeaterFields{
                    title
                    description
                    image_id
                    image_url
                    image_alt
                  }
                  pages {
                    headingAdditionlaServices
                    subHeading
                    faqheadingcommon
                    faqCommon
                  }
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
            }
          `,
        }),
        cache: "no-store",
      });
  
      const servicePageData = await serviceData.json();
  
  return generateMetadataFromLib(servicePageData, false, `${service}`);
}
