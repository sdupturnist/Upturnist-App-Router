import Link from "next/link";
import Images from "./Images";
import { frontendUrl } from "@/utils/variables";

function Logo(props) {
  const { url, alt, logoTitle, for_page } = props;

  return (
    <>
      {props && for_page === "normal" ? (
        <Link
          title={logoTitle}
          aria-label={logoTitle}
          className="block cursor-pointer"
          href={frontendUrl}>
          <img
            src={url}
            alt={alt}
            title={logoTitle}
            className="logo max-w-[250px] block w-full"
          />
        </Link>
      ) : (
        <Link
          title="branding agency in dubai upturnist logo"
          aria-label="branding agency in dubai upturnist logo"
          className="block cursor-pointer"
          href={frontendUrl}>
          <img
            src={url}
            alt="best_branding_agency_dubai_upturnist_logo"
            title="best_branding_agency_dubai_upturnist_logo"
            className="logo max-w-[250px] block w-full"
          />
        </Link>
      )}
    </>
  );
}

export default Logo;
