"use client"
import Layout from "@/components/Layout";
import Metatags from "@/components/Updated/SeoInfo";
import Link from "next/link";
import ContactForm from "@/components/Forms/ContactUs";
import { AOSInit } from "@/components/Aos";
import LocationMap from "@/components/GoogleMap";
import PageHeading from "@/components/PageHeading";
import SocialIcons from "@/components/Social";
import { useSiteContext } from "@/context/siteContext";

export default function Contact({ contactPageData }) {


  const {contact} = useSiteContext()

  const pageData = contactPageData.data.pages.nodes[0];



  return (
    <>
      <Layout>
        <AOSInit />

        <PageHeading
          heading={pageData.title && pageData.title}
          subHeading={pageData.pages.subHeading && pageData.pages.subHeading}
          banner={
            contactPageData &&
            contactPageData?.data?.pages?.nodes[0]?.pages?.heroBanner?.node
              ?.sourceUrl
          }
        />

        <section
          className="section-1 flex items-center overflow-hidden text-center"
          data-aos="fade-up"
          >
          <div className="container mx-auto">
            <div className="grid sm:gap-[20px] gap-[10px] sm:max-w-[70%] mx-auto item-1 items-center justify-center">
              <p className="sub-heading">
                {contact && contact.heading}
              </p>
              <p>{contact && contact.address}</p>
              {contact && (
                <>
                  <Link
                    title="Phone"
                    aria-label="Phone"
                    className="para"
                    href={`tel:${contact.phone}`}>
                    {contact.phone}
                  </Link>
                  <Link
                    title="Email"
                    aria-label="Email"
                    className="para"
                    href={`mailto:${contact.email}`}>
                    {contact.email}
                  </Link>
                </>
              )}
             <SocialIcons classes="flex items-center justify-center gap-[10px] mt-[20px]" social={contact && contact}/>
            </div>
          </div>
        </section>

        <section
          className="section-2 flex items-center overflow-hidden pb-0 text-start"
           data-aos="fade-up"
          >
          <div className="container mx-auto">
            <div className="lg:max-w-[80%] mx-auto item-1">
              <ContactForm />
            </div>
          </div>
        </section>

        <section className="location-map-wrpr lg:pb-[15vh] pb-[50px]"
         data-aos="fade-up"
        >
          <div className="container">
            <LocationMap />
          </div>
        </section>
      </Layout>
    </>
  );
}