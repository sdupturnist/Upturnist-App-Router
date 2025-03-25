'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  frontendUrl,
  wordpressGraphQlApiUrl,
  wordpressRestApiUrlWordpressMenus,
} from "@/utils/variables";

const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [homeMenus1, setHomeMenus1] = useState(null);
  const [homeMenus2, setHomeMenus2] = useState(null);
  const [primaryMenu, setPrimaryMenu] = useState(null);
  const [footerSitemap, setFooterSitemap] = useState(null);
  const [footerMenuBranding, setFooterMenuBranding] = useState(null);
  const [footerMenuFunnerMarketing, setFooterMenuFunnerMarketing] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch social icons (contact info) and menu data
  useEffect(() => {
    // Fetch social icons (contact)
    async function fetchSocialIcons() {
      try {
        const res = await axios.post(
          wordpressGraphQlApiUrl,
          {
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
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            params: {
              revalidate: 10,
            },
          }
        );

        setContact(res?.data?.data?.contact?.nodes[0]?.contact);
      } catch (error) {
        setError("Failed to fetch contact data");
        setContact(null);
      }
    }

    // Fetch menu data
    async function fetchMenuData() {
      setLoading(true);  // Set loading true when initiating the fetch
      try {
        const [
          homeMenus1Res,
          homeMenus2Res,
          primaryMenuRes,
          sitmapMenuRes,
          brandingMenuRes,
          funnelmarketingMenuRes,
        ] = await Promise.all([
          axios.get(`${wordpressRestApiUrlWordpressMenus}menus/perception-branding`),
          axios.get(`${wordpressRestApiUrlWordpressMenus}menus/funnel-marketing`),
          axios.get(`${wordpressRestApiUrlWordpressMenus}menus/primary-menu`),
          axios.get(`${wordpressRestApiUrlWordpressMenus}menus/sitmap-menu`),
          axios.get(`${wordpressRestApiUrlWordpressMenus}menus/branding-menu`),
          axios.get(`${wordpressRestApiUrlWordpressMenus}menus/funnelmarketing-menu`),
        ]);

        // Update the state with the menu data
        setHomeMenus1(homeMenus1Res.data);
        setHomeMenus2(homeMenus2Res.data);
        setPrimaryMenu(primaryMenuRes.data);
        setFooterSitemap(sitmapMenuRes.data);
        setFooterMenuBranding(brandingMenuRes.data);
        setFooterMenuFunnerMarketing(funnelmarketingMenuRes.data);

        setError(null);  // Clear any previous error after successful fetch
      } catch (error) {
        setError("Failed to fetch menu data");
        setHomeMenus1(null);
        setHomeMenus2(null);
        setPrimaryMenu(null);
        setFooterSitemap(null);
        setFooterMenuBranding(null);
        setFooterMenuFunnerMarketing(null);
      } finally {
        setLoading(false);  // Set loading to false after both data fetches are done
      }
    }

    // Trigger fetch calls
    fetchSocialIcons();
    fetchMenuData();
  }, []);

  return (
    <SiteContext.Provider
      value={{
        homeMenus1,
        homeMenus2,
        primaryMenu,
        footerSitemap,
        footerMenuBranding,
        footerMenuFunnerMarketing,
        contact,
        loading,
        error,
      }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  return useContext(SiteContext);
};
