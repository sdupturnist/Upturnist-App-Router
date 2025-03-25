"use client"
import {
  frontendUrl,
} from "@/utils/variables";

import Layout from "@/components/Layout";
import Metatags from "@/components/Updated/SeoInfo";
import { AOSInit } from "@/components/Aos";
import Images from "@/components/Images";
import { useModalContext } from "@/context/modalContext";
import Accordion from "@/components/Accordion";
import { useEffect, useState } from "react";
import Button from "@/components/Buttons";
import { ArrowUpRightIcon } from "@heroicons/react/24/outline";

import {
  PortfolioSlider,
  HeroContent,
  HomeVideoBox,
} from "@/utils/DynamicComponents";

import ReadMore from "@/components/ReadMore";
import Link from "next/link";
import { useSiteContext } from "@/context/siteContext";
import { useThemeContext } from "@/context/themeContext";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import ReactPlayer from "react-player";
import Testimonial from "@/components/Testimonial";
import DownloadFormHome from "@/components/Forms/DownloadFormHome";


export default function Home({
  homePageData,
  moreServicesDatas,
  whoWeAreDatas,
  worksData,
  testimonialData,
  serviceListHomeData_,
  videosData,
  homeMenus1_,
  homeMenus2_,
  primaryMenu_,
  sitmapMenu_,
  brandingMenu_,
  funnelmarketingMenu_,
  contactData,
}) {
  const { setModalFor, setShowModal } = useModalContext();
  const { homeMenus1, homeMenus2 } = useSiteContext();
  const { theme } = useThemeContext();

  const pageData = homePageData?.data?.pages?.nodes[0]?.homePage;
  const _moreServicesData = moreServicesDatas?.data?.moreServices?.nodes;
  const _whoWeAreDatas = whoWeAreDatas?.data?.allWhoWeAre?.nodes;
  //const _works = worksData?.data?.works?.nodes
  const _testimonial = testimonialData?.data?.testimonials?.nodes;
  const _servicesHome = serviceListHomeData_?.data?.allServiceListHome?.nodes;
  const _videosData = videosData?.data?.allVideos?.nodes[0];

  let htmlString =
    pageData?.seoVisibilityReportHeading1 &&
    pageData.seoVisibilityReportHeading1;
  // Ensure `htmlString` is defined before calling `replace`
  let strippedHtml = htmlString
    ? htmlString.replace(/<p>/g, "").replace(/<\/p>/g, "")
    : "";

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 575);

      const handleResize = () => {
        const isCurrentlyMobile = window.innerWidth < 575;
        if (isCurrentlyMobile !== isMobile) {
          setIsMobile(isCurrentlyMobile);
        }
      };

      // Add event listener to track window resizing
      window.addEventListener("resize", handleResize);

      // Cleanup event listener on unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [isMobile]);

  const openDownloadModal = () => {
    setShowModal(true);
    setModalFor("download");
  };

  const openHeroModal = () => {
    setShowModal(true);
    setModalFor("hero");
  };

  const openOfferModal = () => {
    setShowModal(true);
    setModalFor("offer");
  };

  useEffect(() => {
    // Get the video element by its class name
    const video = document.getElementsByClassName("video-player")[0];

    // Function to attempt to play the video
    const playVideo = async () => {
      try {
        if (video) {
          // Set video to muted for autoplay to work in most browsers
          video.muted = true;
          await video.play();
          console.log("Video is playing");
        }
      } catch (error) {
        console.error("Error attempting to play the video:", error);
      }
    };

    // Force play after component mounts
    if (video) {
      playVideo();
    }
  }, []); // Empty dependency array to run only once on mount

  return (
    <>
      <Layout
        headerMenu={primaryMenu_}
        footerSitemapMenu={sitmapMenu_}
        footerBrandingMenu={brandingMenu_}
        footerFunnelmarketingMenu={funnelmarketingMenu_}
        contact={contactData}>
        <AOSInit />

        <section className="bg-black lg:text-start sm:rounded-[15px] text-center items-center text-white sm:p-[100px] sm:py-[30px] pt-[50px] px-[50px] sm:mt-[5px] sm:min-h-[80vh] hero-home flex overflow-hidden pb-[60px] relative ]">
          <div className="card- z-10 relative">
            <div className="grid sm:gap-[30px] gap-[14px] md:max-w-[85%]">
              <HeroContent
                title={pageData?.heroTitle}
                animatedHeading={pageData?.heroAnimatedHeading}
                desc={pageData?.heroDescription}
                modalAction={openHeroModal}
                buttonLabel="Let's start"
              />
            </div>
          </div>
          <div className="video-wrpr sm:rounded-[15px] overflow-hidden">
            <Images
              imageurl={pageData?.heroVideoImage?.node?.sourceUrl || "Upturnist"}
              quality={100}
              width={"1700"}
              height={"800"}
              title={pageData?.heroVideoImage?.node?.altText || "Upturnist"}
              alt={pageData?.heroVideoImage?.node?.altText || "Upturnist"}
              placeholder={true}
              classes={"sm:hidden block h-full"}
            />

            {!isMobile && (
              <div className="hidden sm:block">
                <ReactPlayer
                  url={homePageData?.data?.pages?.nodes[0]?.pages?.heroVideo || ""}
                  playing
                  loop
                  muted
                  controls={false}
                  width="100%"
                  height="100%"
                 />
              </div>
            )}
          </div>
        </section>
        <section className="relative grid items-center section-1">
          <div
            className="container"
            data-aos="fade-up"
            data-aos-anchor=".hero-home">
            <div className="grid sm:gap-[70px] gap-[30px]">
              <div>
                <h1
                  className="para"
                  dangerouslySetInnerHTML={{
                    __html:
                      pageData?.aboutHeadingTop && pageData.aboutHeadingTop,
                  }}
                />
                <h2 className="heading-3 mt-[20px] sm:mb-[20px] mb-[10px]">
                  {pageData?.aboutHeadingTopTwo && pageData.aboutHeadingTopTwo}
                </h2>

                <div className="grid gap-[16px]">
                  <ReadMore inMobile maxLength={50}>
                    {pageData?.aboutDescription && pageData.aboutDescription}
                  </ReadMore>
                </div>
              </div>
              <Images
                imageurl={
                  pageData?.aboutImageLight?.node?.sourceUrl
                }
                styles={""}
                quality={100}
                width={"1700"}
                height={"1000"}
                title={pageData?.aboutImageLight?.node?.altText || "Upturnist"}
                alt={pageData?.aboutImageLight?.node?.altText || "Upturnist"}
                placeholder={true}
                classes={"block w-full rounded-[15px] lg:h-[70vh] object-cover"}
              />
            </div>
          </div>
        </section>

        <section className="section-services-1 ">
          <div className="container grid sm:gap-[50px] gap-[30px]">
            <h2 className="heading-2 text-center" data-aos="fade-up">
              {pageData?.homeMenu1 && pageData?.homeMenu1}
            </h2>

            <ul className="lg:flex grid gap-[30px] items-start service-list">
              {Array.isArray(homeMenus1_) &&
                homeMenus1_.map((item, index) => {
                  return (
                    <li
                      data-aos="fade-up"
                      key={index}
                      className={`${
                        theme === "dark" ? "rounded-[30px]" : "rounded-[16px]"
                      } card p-[40px] w-full min-h-[150px]`}>
                       <Link
                        title={item?.title}
                        href={`${frontendUrl.replace(
                          /\/$/,
                          ""
                        )}/${item?.acf?.slug}/`}>
                        <h3 className="text-[23px] mb-[10px] flex items-center gap-[7px]">
                          {item?.title}
                          {item?.acf?.slug && (
                            <ArrowUpRightIcon className="sm:size-[14px] size-[12px] hover:opacity-50 transition-all" />
                          )}
                        </h3>
                      </Link>
                      {item?.acf?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.acf?.description,
                          }}
                        />
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>

        <section className="section-services-2">
          <div className="container grid sm:gap-[50px] gap-[30px]">
            <h2 className="heading-2 text-center" data-aos="fade-up">
              {pageData?.homeMenu2 && pageData?.homeMenu2}
            </h2>

            <ul className="lg:flex grid gap-[30px] items-center service-list">
              {Array.isArray(homeMenus2_) &&
                homeMenus2_.map((item, index) => {
                  return (
                    <li
                      key={index}
                      data-aos="fade-up"
                      className={`${
                        theme === "dark" ? "rounded-[30px]" : "rounded-[16px]"
                      } card p-[40px] w-full min-h-[150px]`}>
                     
                      <Link
                        title={item?.title}
                        href={`${frontendUrl.replace(
                          /\/$/,
                          ""
                        )}/${item?.acf?.slug}/`}>
                        <h3 className="text-[23px] mb-[10px] flex items-center gap-[7px]">
                          {item?.title}
                          {item?.acf?.slug && (
                            <ArrowUpRightIcon className="sm:size-[14px] size-[12px] hover:opacity-50 transition-all" />
                          )}
                        </h3>
                      </Link>
                      {item?.acf?.description && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: item?.acf?.description,
                          }}
                        />
                      )}
                    </li>
                  );
                })}
            </ul>
          </div>
        </section>

        <section
          className={`${
            theme === "light" && "overflow-hidden"
          } bg-black sm:rounded-[15px] text-white sm:pb-[100px] pb-[50px] lg:mt-[15vh] mt-[50px] section-2 relative flex items-center text-center lg:min-h-screen`}>
          <div className="container lg:block grid sm:gap-[50px] relative z-10">
            <div className="mb-[50px] sm:px-0 px-[30px]" data-aos="fade-left">
              <div className="grid gap-[10px] sm:gap-[20px] heading1">
                <h2 className="heading-1">
                  {pageData?.aboutCta1 && pageData?.aboutCta1}
                </h2>
                <p
                  data-delay="500"
                  className="sm:max-w-[70%] mx-auto text-[14px] sm:text-[20px]"
                  dangerouslySetInnerHTML={{
                    __html: pageData?.aboutCta1Desc && pageData?.aboutCta1Desc,
                  }}
                />
              </div>
            </div>

            <div
              className="sm:mb-[100px] mb-[50px] sm:px-0 px-[30px]"
              data-aos="fade-right">
              <div className="grid gap-[10px] sm:gap-[20px] heading3">
                <h2 className="heading-1">
                  {pageData?.aboutCta2 && pageData?.aboutCta2}
                </h2>
                <p
                  data-delay="500"
                  className="sm:max-w-[70%] mx-auto text-[14px] sm:text-[20px]"
                  dangerouslySetInnerHTML={{
                    __html: pageData?.aboutCta2Desc && pageData?.aboutCta2Desc,
                  }}
                />
              </div>
            </div>
            <Button
              size="normal"
              label="Let's start"
              icon={true}
              classes="mx-auto"
              action={openHeroModal}
            />

            {/* <div
              className="card rounded-[15px] text-white sm:p-[80px] p-[40px]  lg:px-[180px] lg:py-[100px] heading4"
              data-aos="fade-up">
              <div className="grid gap-[20px]">
                <h2 className="heading-3">
                  {pageData.aboutCta4 && pageData.aboutCta4}
                </h2>
                <div
                  className="[&>*]:mb-[16px] [&>p:last-child]:mb-0"
                  data-delay="500"
                  dangerouslySetInnerHTML={{
                    __html: pageData.aboutCta4Desc && pageData.aboutCta4Desc,
                  }}
                />
                <p
                data-delay="500"
                dangerouslySetInnerHTML={{
                __html:
                pageData.aboutCta4Desc4_2 && pageData.aboutCta4Desc4_2,
                }}
                />
                <div className="mt-3 flex items-center">
                  <Button
                    size="normal"
                    label="Let's start"
                    icon={true}
                    classes="mx-auto"
                    action={openHeroModal}
                  />
                </div>
              </div>
            </div> */}
          </div>
          <BackgroundAnimation />
        </section>

        <section
          className="relative grid items-center section-3"
          data-aos="fade-up">
          <div className="container">
            <div className="card rounded-[15px] grid sm:gap-[70px] gap-[30px] overflow-hidden">
              <Images
                imageurl={
                  pageData?.seoVisibilityReportImageLight?.node?.sourceUrl
                }
                styles={""}
                quality={100}
                width={"1700"}
                height={"1000"}
                title={
                  pageData?.seoVisibilityReportImageLight?.node?.altText ||
                  "Upturnist"
                }
                alt={
                  pageData?.seoVisibilityReportImageLight?.node?.altText ||
                  "Upturnist"
                }
                placeholder={true}
                classes={
                  "block w-full rounded-[15px] rounded rounded-b-none lg:h-[70vh] object-cover"
                }
              />
              <div className="sm:pb-[100px] sm:px-[100px] p-[30px] pt-0">
                <h3
                  className="para"
                  dangerouslySetInnerHTML={{ __html: strippedHtml }}
                />
                <h2 className="heading-3 mt-[16px] mb-[10px]">
                  {pageData?.seoVisibilityReportHeading2 &&
                    pageData?.seoVisibilityReportHeading2}
                </h2>

                <div className="grid gap-[16px]">
                  <p
                    dangerouslySetInnerHTML={{
                      __html:
                        pageData?.seoVisibilityReportHeadingDescription &&
                        pageData?.seoVisibilityReportHeadingDescription,
                    }}
                  />
                  <div className="mt-[10px]">
                    <Button
                      size="normal"
                      label={
                        pageData?.seoVisibilityReportHeadingCtaLabel &&
                        pageData?.seoVisibilityReportHeadingCtaLabel
                      }
                      icon={true}
                      action={openOfferModal}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="relative grid items-center section-4 sm:text-start text-center"
          data-aos="fade-up">
          <div className="container">
            <div className="grid sm:gap-[70px] gap-[50px]">
              <div>
                <h2 className="heading-3 mt-[0px] mb-[10px]">
                  {pageData?.specialzeHeading && pageData?.specialzeHeading}
                </h2>

                <div className="grid gap-[16px]">
                  <ReadMore inMobile maxLength={40}>
                    {pageData?.specialzeDesc && pageData?.specialzeDesc}
                  </ReadMore>
                </div>
              </div>

              <Images
                imageurl={
                  pageData?.specialzeImageLight?.node?.sourceUrl
                }
                styles={""}
                quality={100}
                width={"1700"}
                height={"1000"}
                title={
                  pageData?.specialzeImageLight?.node?.altText || "Upturnist"
                }
                alt={
                  pageData?.specialzeImageLight?.node?.altText || "Upturnist"
                }
                placeholder={true}
                classes={"block w-full rounded-[15px] lg:h-[70vh] object-cover"}
              />
            </div>
          </div>
        </section>

        <section
          className="relative grid items-center section-5"
          data-aos="fade-up">
          <div className="container">
            <div className="grid sm:gap-[150px] gap-[60px]">
              <div className="grid gap-3">
                <h2 className="heading-3 mt-[0px] mb-[10px] text-center">
                  {pageData?.services1Heading && pageData?.services1Heading}
                </h2>
                <div className="grid gap-8">
                  {/* <ReadMore inMobile maxLength={50}> */}
                  {/* {pageData.services1Description && */}
                  {/* pageData.services1Description} */}
                  {/* </ReadMore> */}

                  <div
                    className="content text-center  sm:text-center"
                    dangerouslySetInnerHTML={{
                      __html:
                        pageData?.services1Description &&
                        pageData?.services1Description,
                    }}
                  />
                  <Button
                    size="normal"
                    label="Let's start"
                    icon={true}
                    classes="mx-auto"
                    action={openHeroModal}
                  />
                </div>
              </div>

              <Images
                imageurl={
                  pageData?.services1ImageLight?.node?.sourceUrl
                }
                styles={""}
                quality={100}
                width={"1700"}
                height={"1000"}
                title={
                  pageData?.services1ImageLight?.node?.altText || "Upturnist"
                }
                alt={
                  pageData?.services1ImageLight?.node?.altText || "Upturnist"
                }
                placeholder={true}
                classes={"block w-full rounded-[15px] lg:h-[70vh] object-cover"}
              />
            </div>
          </div>
        </section>


        <section
          className={`${
            theme === "light" && "bg-black-"
          } sm:rounded-[15px] text-white sm:py-[100px] py-[24px] lg:mt-[15vh] mt-[50px] relative section-6 overflow-hidden`}>
          <div className="container grid gap-[70px] relative z-10">
            {/* <div> */}
            {/* <h3 className="heading-3 text-center"> */}
            {/* {pageData.services2Heading && pageData.services2Heading} */}
            {/* </h3> */}
            {/* </div> */}

            <div>
              <ul className="sm:gap-[50px] gap-[24px] grid md:grid-cols-2 col-wrpr">
                {Array.isArray(_servicesHome) &&
                  _servicesHome.map((item, key) => {
                    return (
                      <li
                        key={key}
                        data-aos="fade-up"
                        className={`${
                          theme === "dark" ? "rounded-[30px]" : "rounded-[16px]"
                        } card card-effect p-[40px]`}>
                   <h3 className="text-[23px] mb-[16px]">
                          {item.title && item.title}
                        </h3>

                        <ReadMore maxLength={30}>
                          {item && item.content}
                        </ReadMore>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <BackgroundAnimation />
        </section>

        <section
          className="lg:min-h-[80vh] flex items-center section-7 overflow-hidden relative"
          data-aos="fade-up">
          <div className="container">
            <div className="mx-auto lg:max-w-[1199px] w-full flex flex-col items-center justify-center lg:flex-row sm:gap-[50px] gap-[30px]">
              {/* {theme === "dark" && (
                <VideoPreview theme="dark" data={_videosData} />
              )} */}

              {/* <VideoPreview theme="light" data={_videosData} /> */}

              {/* <HomeVideoBox
                data={_videosData}
                url={
                  _videosData &&
                  _videosData?.videosAcf?.videoPreview?.node?.mediaItemUrl
                }
              /> */}

              <div data-aos="fade-up">
                <Images
                  imageurl="https://admin.upturnist.com/wp-content/uploads/2024/02/download-725x1024.webp"
                  quality={100}
                  width={"450"}
                  height={"450"}
                   title="Upturnist Download"
                  alt="Upturnist Download "
                  placeholder={true}
                  classes={"block w-full lg:h-[450px] border rounded-[12px]"}
                />
              </div>

              <div
                className="flex-1 lg:max-w-[450px] grid gap-[24px] items-center w-full"
                data-aos="fade-up">
                <div className="grid gap-[20px]">
                  <h3 className="sm:text-[28px] text-[24px]">
                    {pageData?.downloadHeading && pageData?.downloadHeading}
                  </h3>
                  <div>
                    {/* <Button */}
                    {/* size="normal" */}
                    {/* label="Download" */}
                    {/* icon={true} */}
                    {/* action={openDownloadModal} */}
                    {/* /> */}
                    <DownloadFormHome />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className={`${theme === "dark" && "bg-box"} section-8`}>
          <div className="container sm:gap-[50px] gap-[30px] grid">
            <h3 className="heading-3 text-start sm:text-center">
              {pageData?.servicesListHeading && pageData?.servicesListHeading}
            </h3>
            {/* <ul className="grid md:grid-cols-2 gap-[30px] col-wrpr"> */}
            {/* {_moreServicesData && */}
            {/* _moreServicesData.map((service, key) => { */}
            {/* return ( */}
            {/* <li */}
            {/* key={key} */}
            {/* data-aos="fade-up" */}
            {/* className={`${ */}
            {/* theme === "dark" ? "rounded-[30px]" : "rounded-[16px]" */}
            {/* } card p-[40px]`}> */}
            {/* {service?.featuredImage?.node?.sourceUrl && ( */}
            {/* <div className="icon mb-[20px]"> */}
            {/* <Images */}
            {/* imageurl={service?.featuredImage?.node?.sourceUrl} */}
            {/* quality={100} */}
            {/* width={"12"} */}
            {/* height={"12"} */}
            {/* alt="test" */}
            {/* placeholder={true} */}
            {/* classes={"block h-[12px]"} */}
            {/* /> */}
            {/* </div> */}
            {/* )} */}
            {/* <div */}
            {/* className="content" */}
            {/* dangerouslySetInnerHTML={{ __html: service.content }} */}
            {/* /> */}
            {/* </li> */}
            {/* ); */}
            {/* })} */}
            {/* </ul> */}

            {_moreServicesData &&
              _moreServicesData.map((service, key) => {
                return (
                  <div
                    key={key}
                    className="content text-center text-start sm:text-center"
                    dangerouslySetInnerHTML={{ __html: service.content }}
                  />
                );
              })}
            <Button
              size="normal"
              label="Let's start"
              icon={true}
              classes="sm:mx-auto"
              action={openHeroModal}
            />
          </div>
        </section>

        <section
          className="sm:rounded-[15px] text-center bg-black text-white sm:p-[100px] px-[20px] py-[50px] overflow-hidden sm:min-h-[90vh] lg:mt-[15vh] mt-[50px]  relative grid items-center section-9"
          data-aos="fade-up">
          <div className="container relative z-10">
            <div className="sm:rounded-[15px] text-white flex flex-col items-center lg:flex-row sm:gap-[100px] gap-[30px]">
              <div className="flex-1 lg:order-1 order-2">
                <h2 className="heading-3 mb-[20px]">
                  {pageData?.about2Heading && pageData?.about2Heading}
                </h2>
                <ReadMore btnpos="center" maxLength={50}>
                  {pageData?.about2Description && pageData?.about2Description}
                </ReadMore>
              </div>
            </div>
          </div>

          <div className="video-wrpr">
            <Images
             imageurl={pageData?.heroVideoImage?.node?.sourceUrl || "Upturnist"}
             quality={100}
             width={"1700"}
             height={"800"}
             title={pageData?.heroVideoImage?.node?.altText || "Upturnist"}
             alt={pageData?.heroVideoImage?.node?.altText || "Upturnist"}
             placeholder={true}
             classes={"sm:hidden block h-full"}
            />
            {!isMobile && (
              <div className="hidden sm:block">
                <ReactPlayer
                  url={homePageData?.data?.pages?.nodes[0]?.pages?.heroVideo || ""}
                  playing
                  loop
                  muted
                  controls={false}
                  width="100%"
                  height="100%"
                  />
              </div>
            )}
          </div>
        </section>

        <section className=" relative section-10">
          <div className="container grid lg:grid-cols-5 lg:gap-[100px] gap-[50px]">
            <div className="lg:col-span-2 lg:sticky top-[50px] z-10 ">
              <div className="heading-wrpr">
                <h3
                  className="heading-1 top-0 text-center lg:text-start"
                  data-aos="fade-up">
                  {pageData?.whoWeAreHeading && pageData?.whoWeAreHeading}
                </h3>
              </div>
            </div>

            <div className="lg:col-span-3">
              <ul className="grid md:grid-cols-2 gap-[30px] col-wrpr">
                {Array.isArray(_whoWeAreDatas) &&
                  _whoWeAreDatas.map((item, index) => {
                    return (
                      <li
                        key={index}
                        data-aos="fade-up"
                        className={`${
                          theme === "dark" ? "rounded-[30px]" : "rounded-[16px]"
                        } card p-[30px] `}>
                     <div
                          className="content"
                          dangerouslySetInnerHTML={{ __html: item.content }}
                        />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>

        {pageData?.aboutBottom2 && (
          <section
            className="relative grid items-center section-11"
            data-aos="fade-up">
            <div className="container">
              <div className="grid sm:gap-[70px] gap-[30px]">
                <div>
                  <h2 className="heading-3 mt-[20px] mb-[16px]">
                    {pageData?.aboutBottom2 && pageData?.aboutBottom2}
                  </h2>

                  <div className="grid gap-[16px]">
                    <ReadMore inMobile maxLength={30}>
                      {pageData?.aboutBottom2Content &&
                        pageData?.aboutBottom2Content}
                    </ReadMore>
                  </div>
                </div>
                <Images
                  imageurl={
                    pageData?.about2PhotoLight?.node?.sourceUrl
                  }
                  styles={""}
                  quality={100}
                  width={"1700"}
                  height={"1000"}
                  alt={pageData?.about2PhotoLight?.node?.altText || "Upturnist"}
                  placeholder={true}
                  classes={
                    "block w-full rounded-[15px] lg:h-[70vh] object-cover"
                  }
                />
              </div>
            </div>
          </section>
        )}
        {/*  */}
        {/* <section */}
        {/* className={`${theme === "dark" && "bg-box"} section-12 pb-0`} */}
        {/* data-aos="fade-up"> */}
        {/* <div className="container"> */}
        {/* <h3 className="heading-2 text-center sm:mb-[70px] mb-[30px]"> */}
        {/* {pageData.ourWorksHeading && pageData.ourWorksHeading} */}
        {/* </h3> */}
        {/* <div className="work-wrpr"> */}
        {/* <PortfolioSlider data={worksData} /> */}
        {/* </div> */}
        {/* </div> */}
        {/* </section> */}

        <section className="section-13" data-aos="fade-up">
          <div className="container">
            <h3 className="heading-2 text-center sm:mb-[70px] mb-[30px]">
              {pageData && pageData?.faqHeading}
            </h3>
            <div className="faq-wrpr">
              {pageData && <Accordion data={pageData && pageData.faq} />}
            </div>
          </div>
        </section>

        <section className="section-14 sm:mb-[100px] mb-[30px] relative">
          <div className="container">
            <h3
              className="heading-2 text-center sm:mb-[70px] mb-[30px]"
              data-aos="fade-up">
              {pageData?.testimonialHeading && pageData?.testimonialHeading}
            </h3>
            <div className="reviews-wrpr">
              <div className="columns-1 sm:columns-2 xl:columns-3 gap-[30px]">
                {Array.isArray(_testimonial) &&
                  _testimonial.map((item, index) => (
                    <Testimonial key={index} data={item} />
                  ))}
              </div>
            </div>
            {/* {_testimonial && <TestimonialSlider data={_testimonial} />} */}
          </div>
        </section>
      </Layout>
    </>
  );
}