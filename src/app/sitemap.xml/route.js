// app/sitemap.js or app/sitemap.xml/route.js
import { frontendUrl, wordpressUrl } from "@/utils/variables";

const frontendUrl_ = `https://upturnist.com/`;
const GRAPHQL_QUERY_URL = `${wordpressUrl}/graphql`;

// Updated GraphQL query to fetch both pages and blogs
const GRAPHQL_QUERY = `
  query SiteContent {
    pages(first: 500) {
      nodes {
        uri
      }
    }
    allBlogs(first: 500) {
      nodes {
        slug
      }
    }
  }
`;

// List of URLs to exclude, normalized
const EXCLUDED_URLS = [
  `${frontendUrl_}thank-you-schedule-call/`,
  `${frontendUrl_}thankyou-schedule-call/`,
  `${frontendUrl_}thankyou-seo/`,
  `${frontendUrl_}thankyou-subscribe/`,
  `${frontendUrl_}thank-you/`,
  `${frontendUrl_}thankyou-offer/`,
  `${frontendUrl_}thankyou-packages/`,
  `${frontendUrl_}home/`,
  `${frontendUrl_}terms-and-conditions/`,
  `${frontendUrl_}privacy-policy/`,
  `${frontendUrl_}thankyou-download/`,
].map((url) => normalizeUrl(url)); // Normalize URLs

// Normalize URL function to remove trailing slashes
function normalizeUrl(url) {
  return url.replace(/(^\/+|\/+$)/g, ""); // Remove leading and trailing slashes
}

// Function to generate the sitemap XML
function generateSiteMap(pages, blogs) {
  // Ensure frontendUrl_ does not end with a slash
  const baseUrl = normalizeUrl(frontendUrl_);
  
  // Map blog slugs to URIs
  const blogPages = blogs.map(({ slug }) => ({
    uri: `/blogs/${slug}/`,
  }));
  
  // Combine pages and blog pages
  const allContent = [...pages, ...blogPages];
  
  // Filter out excluded URLs
  const filteredContent = allContent.filter(({ uri }) => {
    // Construct full URL for each page or blog
    const fullUrl = normalizeUrl(`${baseUrl}${uri}`);
    
    const isExcluded = EXCLUDED_URLS.includes(fullUrl);
    if (isExcluded) {
      // console.log(`Excluding: ${fullUrl}`);
    }
    
    return !isExcluded;
  });
  
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}/</loc>
    </url>
    ${filteredContent
      .map(({ uri }) => {
        const fullUrl = normalizeUrl(`${baseUrl}${uri}`);
        return `
          <url>
            <loc>${fullUrl}/</loc>
          </url>
        `;
      })
      .join("")}
  </urlset>
  `;
}

// Option 1: Using the sitemap.js approach (simpler)
export async function generateSitemapXml() {
  // Fetch the GraphQL data
  const response = await fetch(GRAPHQL_QUERY_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: GRAPHQL_QUERY }),
    next: { revalidate: 3600 }, // Revalidate every hour
  });

  const { data } = await response.json();
  const pages = data.pages.nodes;
  const blogs = data.allBlogs.nodes;

  // Generate the XML sitemap
  return generateSiteMap(pages, blogs);
}

// Option 1: For app/sitemap.js
export async function GET() {
  const xml = await generateSitemapXml();
  
  return new Response(xml, {
    headers: {
      'Content-Type': 'text/xml',
    },
  });
}

// Option 2: For app/sitemap.xml/route.js - Uncomment this if using the route.js approach
// export async function GET() {
//   const xml = await generateSitemapXml();
//   
//   return new Response(xml, {
//     headers: {
//       'Content-Type': 'text/xml',
//     },
//   });
// }