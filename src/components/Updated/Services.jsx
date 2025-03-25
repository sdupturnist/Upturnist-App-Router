"use client"
import Layout from "@/components/Layout";
import { AOSInit } from "@/components/Aos";
import MetatagsServiceSingle from "@/components/SeoServiceSingle";
import { useEffect, useState } from "react";
import ReadMore from "@/components/ReadMore";
import Images from "@/components/Images";
import { useRef } from "react";
import Package from "@/components/Package";
import ComparePackages from "@/components/PackageCompare";
import { useThemeContext } from "@/context/themeContext";
import dynamic from "next/dynamic"; // Dynamically import useRouter
import AnimatedTextCharacter from "@/components/AnimatedText";
import PageNotFound from "@/components/PageNotFound";

const useRouter = dynamic(() => import("next/router").then((mod) => mod.useRouter), { ssr: false });

export default function Service({ servicePageData, allPackagesData }) {
  const router = useRouter();

  const { theme } = useThemeContext();

  // Destructure data from servicePageData
  const pageData = servicePageData?.data?.pages?.nodes[0];
  const packageData = allPackagesData?.data?.packages?.nodes;
  const serviceData =
    servicePageData?.data?.pages?.nodes[0]?.mainContentRepeaterFields;

  const content = pageData?.content;

  const [isExpanded, setIsExpanded] = useState(false);
  const packageRef = useRef(null);

  const handleShowMorePackage = () => {
    setIsExpanded(!isExpanded);
    if (packageRef.current) {
      packageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  if (!pageData) {
    return <PageNotFound/>
  }


  return (
    <>
      {pageData && <MetatagsServiceSingle data={servicePageData} />}
      {pageData && (
        <Layout>
          <AOSInit />
          <div className="service-single overflow-hidden">
            <section
              className={`${
                theme === "dark" && "bg-box"
              } hero-home flex items-center text-center sm:mb-[50px] sm:pt-[100px] pt-[30px]`}
              data-aos="fade-up">
              <div className="container mx-auto">
                <div className="grid sm:gap-[20px] gap-[10px]">
                  <h1 data-aos="fade-up" className="heading-1 h2">
                    {pageData && pageData.title}
                    <span className="block">
                      <AnimatedTextCharacter
                        text={pageData && pageData.subHeading}
                      />
                    </span>
                  </h1>
                  {pageData.pages.subHeading && (
                    <p
                      data-aos="fade-up"
                      data-delay="500"
                      className={`first-letter:capitalize`}
                      dangerouslySetInnerHTML={{
                        __html: pageData.pages.subHeading,
                      }}
                    />
                  )}
                </div>
              </div>
            </section>

            {servicePageData?.data?.pages?.nodes[0]?.mainContentRepeaterFields
              ?.length > 0 && (
              <section className="relative grid items-center section-2 pt-[40px] xl:pb-[15vh] sm:pb-[50px] pb-[20px]">
                <div className="container grid sm:gap-[100px] gap-[50px] list-items">
                  {servicePageData &&
                    serviceData &&
                    serviceData.map((item, key) => {
                      const columnOrder = key % 2 !== 0; // Check if the index is odd
                      return (
                        <div
                          data-aos="fade-up"
                          key={key}
                          className="card card-lg item card-effect sm:p-[80px] p-[40px] rounded-[30px] flex flex-col items-center xl:flex-row sm:gap-[100px] gap-[30px]">
                          <div className="flex-1 xl:order-1 order-2">
                            {key === 0 ? (
                              <h2 className="heading-3 mb-[20px]">
                                {item?.title}
                              </h2>
                            ) : (
                              <h2 className="heading-3 mb-[20px]">
                                {item?.title}
                              </h2>
                            )}

                            <ReadMore maxLength={500}>
                              {item?.description}
                            </ReadMore>
                            <div></div>
                          </div>
                          {item?.image_url && (
                            <div
                              className={`${
                                columnOrder ? "xl:order-2 order-1" : ""
                              } image-box- mx-auto`}>
                              <div className="line"></div>
                              <Images
                                imageurl={item?.image_url}
                                styles={""}
                                quality={80}
                                width={"600"}
                                height={"550"}
                                alt={item?.image_alt || item?.title}
                                placeholder={true}
                                classes={"block w-full"}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </section>
            )}

            {/* PACKAGES */}

            {router?.query?.service[0] === "digital-marketing-uae" && (
              <section
                className="section-1 flex items-center text-center relative pt-0 xl:pb-[15vh] pb-[50px]"
                data-aos="fade-up">
                <div className="container mx-auto items-center">
                  <div className="mb-[30px] sm:mb-[70px]">
                    <h2 className="heading-2">
                      Our Digital Marketing Packages
                    </h2>
                  </div>
                  <div className="sm:grid hidden grid-cols-1 xl:grid-cols-3 gap-[30px] package-wrpr-">
                    {packageData &&
                      packageData.map((item, key) => (
                        <div key={key}>
                          <Package
                            title={item.title}
                            packages={item.packages}
                            content={item.content}
                            viewMore={`${
                              isExpanded
                                ? "max-h-[auto] view-full"
                                : "max-h-[250px] view-less"
                            }`}
                          />
                        </div>
                      ))}
                  </div>
                  <div className="sm:flex hidden">
                    <div className="bottom-expand ">
                      <span className="line-1"></span>
                      <button
                        className="btn btn-small relative z-1 whitespace-nowrap"
                        onClick={handleShowMorePackage}>
                        {isExpanded ? "View less" : "View more features"}
                      </button>
                      <span className="line-2"></span>
                    </div>
                  </div>
                  <div className="mt-[50px]">
                    <ComparePackages data={packageData} />
                  </div>
                </div>
              </section>
            )}

            {content && (
              <section
                data-aos="fade-up"
                className={`${
                  servicePageData?.data?.pages?.nodes[0]
                    ?.mainContentRepeaterFields?.length > 0
                    ? "pt-0"
                    : "pt-[50px]"
                } relative grid items-center section-3 content-service xl:pb-[15vh] pb-[50px]`}>
                <div className="container">
                  <div dangerouslySetInnerHTML={{ __html: content }} />
                </div>
              </section>
            )}
          </div>
        </Layout>
      )}
    </>
  );
}