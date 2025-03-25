import Link from "next/link";
import { useThemeContext } from "@/context/themeContext";
import { useSiteContext } from "@/context/siteContext";
import SocialIcons from "./Social";
import SubscribrForm from "./Forms/SubscribeForm";
import { frontendUrl } from "@/utils/variables";
import { useEffect, useState } from "react";

export default function Footer({
  sitemapMenu,
  brandingMenu,
  funnelmarketingMenu,
}) {
  const { theme } = useThemeContext();
  const {
    footerSitemap,
    footerMenuBranding,
    footerMenuFunnerMarketing,
    contact,
  } = useSiteContext();

  // State for the current year to prevent hydration issues
  const [currentYear, setCurrentYear] = useState(null);

  useEffect(() => {
    // Set the current year only on the client side
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className={`${theme === "dark" && "bg-box"} footer`}>
      <div className="container">
        <div className="wrpr px-[10px]">
          <div className="inner-1">
            <div data-aos="fade-up">
              <SubscribrForm />
            </div>
            <div className="wrpr-2" data-aos="fade-up">
              <>
                {contact && <SocialIcons classes="" social={contact} />}
                <p className="md:text-[16px] text-[14px] mt-[40px]">
                  {/* Render current year only after it's set */}
                  © {currentYear ? currentYear : "Loading..."} — Copyright
                </p>
              </>
            </div>
          </div>
          <div className="wrpr-3">
            <div className="inner-2">
              <div data-aos="fade-up">
                <span className="heading">SITEMAP</span>
                <ul className="list-wrpr">
                  <li>
                    <Link
                      title="Home"
                      aria-label="Home"
                      href={frontendUrl}
                      className="link-hover"
                    >
                      Home
                    </Link>
                  </li>

                  {sitemapMenu && sitemapMenu.length > 0
                    ? sitemapMenu.map((item, key) => (
                        <li key={key}>
                          <Link
                            title={item?.post_title}
                            aria-label={item?.post_title}
                            href={`${frontendUrl.replace(
                              /\/$/,
                              ""
                            )}/${item?.acf?.slug.replace(/^\//, "")}/`}
                            className="link-hover"
                          >
                            {item.post_title}
                          </Link>
                        </li>
                      ))
                    : footerSitemap &&
                      footerSitemap.map((item, key) => (
                        <li key={key}>
                          <Link
                            title={item?.post_title}
                            aria-label={item?.post_title}
                            href={`${frontendUrl.replace(
                              /\/$/,
                              ""
                            )}/${item?.acf?.slug.replace(/^\//, "")}/`}
                            className="link-hover"
                          >
                            {item.post_title}
                          </Link>
                        </li>
                      ))}
                </ul>
              </div>
              <div data-aos="fade-up">
                <span className="heading">PERCEPTION BRANDING</span>
                <ul className="list-wrpr">
                  {brandingMenu && brandingMenu.length > 0
                    ? brandingMenu.map((item, key) => (
                        <li key={key}>
                          <Link
                            title={item?.post_title}
                            aria-label={item?.post_title}
                            href={`${frontendUrl.replace(
                              /\/$/,
                              ""
                            )}/${item?.acf?.slug.replace(/^\//, "")}/`}
                            className="link-hover"
                          >
                            {item.post_title}
                          </Link>
                        </li>
                      ))
                    : footerMenuBranding &&
                      footerMenuBranding.map((item, key) => (
                        <li key={key}>
                          <Link
                            title={item?.post_title}
                            aria-label={item?.post_title}
                            href={`${frontendUrl.replace(
                              /\/$/,
                              ""
                            )}/${item?.acf?.slug.replace(/^\//, "")}/`}
                            className="link-hover"
                          >
                            {item.post_title}
                          </Link>
                        </li>
                      ))}
                </ul>
              </div>
            </div>
            <div className="inner-2">
              <div data-aos="fade-up">
                <span className="heading">FUNNEL MARKETING</span>
                <ul className="list-wrpr">
                  {funnelmarketingMenu && funnelmarketingMenu.length > 0
                    ? funnelmarketingMenu.map((item, key) => (
                        <li key={key}>
                          <Link
                            title={item?.post_title}
                            aria-label={item?.post_title}
                            href={`${frontendUrl.replace(
                              /\/$/,
                              ""
                            )}/${item?.acf?.slug.replace(/^\//, "")}/`}
                            className="link-hover"
                          >
                            {item.post_title}
                          </Link>
                        </li>
                      ))
                    : footerMenuFunnerMarketing &&
                      footerMenuFunnerMarketing.map((item, key) => (
                        <li key={key}>
                          <Link
                            title={item?.post_title}
                            aria-label={item?.post_title}
                            href={`${frontendUrl.replace(
                              /\/$/,
                              ""
                            )}/${item?.acf?.slug.replace(/^\//, "")}/`}
                            className="link-hover"
                          >
                            {item.post_title}
                          </Link>
                        </li>
                      ))}
                </ul>
              </div>
              <div data-aos="fade-up">
                <span className="heading">LETS CONNECT</span>
                <ul className="list-wrpr">
                  {contact && (
                    <>
                      <li>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: contact && contact.heading,
                          }}
                        />
                      </li>
                      <li>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: contact && contact.address,
                          }}
                        />
                      </li>
                      <li>
                        <Link
                          title={contact && contact.phone}
                          aria-label="Phone"
                          href={`tel:${contact && contact.phone}`}
                          className="link-hover"
                        >
                          {contact && contact.phone}
                        </Link>
                      </li>
                      <li>
                        <Link
                          title={contact && contact.email}
                          aria-label="Email"
                          href={`mailto:${contact && contact.email}`}
                          className="link-hover"
                        >
                          {contact && contact.email}
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-footer px-[10px]" data-aos="fade-up">
          <div>
            <SocialIcons classes="mb-[30px]" social={contact && contact} />
            <p className="copyright-">
              {/* Render current year only after it's set */}
              © {currentYear ? currentYear : "Loading..."} — Copyright
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
