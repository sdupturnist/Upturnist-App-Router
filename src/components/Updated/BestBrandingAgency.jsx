"use client"
import Layout from "@/components/Layout";
import Metatags from "@/components/Updated/SeoInfo";
import { AOSInit } from "@/components/Aos";
import ReadMore from "@/components/ReadMore";
import Button from "@/components/Buttons";
import Testimonial from "@/components/Testimonial";
import { frontendUrl } from "@/utils/variables";
import VideosSlider from "@/components/VideosSlider";
import Accordion from "@/components/Accordion";
import Images from "@/components/Images";
import LandingPageHeroForm from "@/components/Forms/LandingPageHeroForm";
import { useModalContext } from "@/context/modalContext";
import CountUp from "react-countup";
import { useRef, useState } from "react";
import FlipCard from "@/components/FlipCard";
import Package from "@/components/Package";
import ComparePackages from "@/components/PackageCompare";

export default function BestBrandingAgency({
  pageData,
  allPackagesData,
  testimonialData,
  videosData,
}) {
  const _testimonial = testimonialData.data.testimonials.nodes;
  const _videosData = videosData?.data?.allVideos?.nodes;
  const packageData = allPackagesData.data.packages.nodes;
  const page = pageData?.data?.pages?.nodes[0]?.landingPage1;

  const { setModalFor, setShowModal, setModalData } = useModalContext();

  const subscribeFormModal = () => {
    setShowModal(true);
    setModalFor("landing-page-subscribe");
  };

  const mainFormModal = () => {
    setShowModal(true);
    setModalFor("landing-page-main-form");
    setModalData(page?.hero?.formHeading && page?.hero?.formHeading);
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const packageRef = useRef(null);

  const handleShowMorePackage = () => {
    setIsExpanded(!isExpanded);
    if (packageRef.current) {
      packageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // const faq = JSON.parse(page?.faqSection?.faq && page?.faqSection?.faq);

  // console.log(page?.faqSection?.faq)

  return (
    <>
      <Layout type="landing-page">
        <AOSInit />
        <div className="overflow-hidden">
          <section className="btn-white-all lg:text-start sm:rounded-[15px] text-center items-center mt-[5px] sm:min-h-[80vh] hero-home overflow-hidden relative lg:pl-[100px] lg:pr-[50px] sm:py-[50px] sm:px-[60px] p-[30px] pt-[50px]">
            <div className="card- lg:flex grid sm:gap-[100px] gap-9 justify-between z-10 relative">
              <div className="flex items-center [&>*]:text-white">
                <div className="grid sm:gap-[20px] gap-[14px]">
                  <span
                    data-aos="fade-up"
                    className="sm:text-[5vw] text-[30px] h2 !leading-[1.2em]">
                    {page?.hero?.heroTitle && page?.hero?.heroTitle}
                  </span>
                  <p
                    data-aos-anchor=".hero-home"
                    data-aos="fade-up"
                    data-delay="500"
                    className={`first-letter:capitalize sm:[&>*]:text-[30px] sm:text-[18px]`}
                    dangerouslySetInnerHTML={{
                      __html: page?.hero?.heroDesc && page?.hero?.heroDesc,
                    }}
                  />

                  {/* <div className="mt-3 flex items-center"> */}
                    {/* <Button */}
                      {/* size="normal" */}
                      {/* label="Ok, get me a copy" */}
                      {/* icon={true} */}
                      {/* action={subscribeFormModal} */}
                      {/* classes={`lg:m-0 mx-auto`} */}
                    {/* /> */}
                  {/* </div> */}

                  <ul className="sm:flex hidden w-full items-center gap-[70px] text-center sm:text-start uppercase !mt-[30px] lg:m-0 mx-auto border-t pt-[32px]"
                  style={{
                    borderColor: "#ffffff26",
                  }}
                  >
                    <li
                    data-aos-anchor=".hero-home"
                      data-aos="fade-up"
                      className="sm:mb-0 mb-[8px] lg:text-[20px] sm:text-[18px] text-[16px]">
                      <CountUp start={0} end={10} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                      + years
                    </li>
                    <li
                      className="sm:mb-0 mb-[8px] lg:text-[20px] sm:text-[18px] text-[16px]"
                         data-aos-anchor=".hero-home"
                      data-aos="fade-up"
                      data-aos-delay="500">
                      <CountUp start={0} end={50} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                      + Projects
                    </li>
                    <li
                      className="lg:text-[20px] sm:text-[18px] text-[16px]"
                         data-aos-anchor=".hero-home"
                      data-aos="fade-up"
                      data-aos-delay="1000">
                      <CountUp start={0} end={100} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                      + Customers
                    </li>
                  </ul>
                </div>
              </div>
              <div className="lg:m-0 mx-auto max-w-[570px]">
                <LandingPageHeroForm
                  style="sm:rounded-[30px] rounded-[20px]"
                  title={page?.hero?.formHeading && page?.hero?.formHeading}
                />
                 <ul className="sm:hidden  w-full items-center gap-[70px] text-center sm:text-start uppercase  mx-auto [&>*]:text-white pt-[32px]"
                  style={{
                    borderColor: "#ffffff26",
                  }}
                  >
                    <li
                    data-aos-anchor=".hero-home"
                      data-aos="fade-up"
                      className="sm:mb-0 mb-[8px] lg:text-[20px] sm:text-[18px] text-[16px]">
                      <CountUp start={0} end={10} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                      + years
                    </li>
                    <li
                      className="sm:mb-0 mb-[8px] lg:text-[20px] sm:text-[18px] text-[16px]"
                         data-aos-anchor=".hero-home"
                      data-aos="fade-up"
                      data-aos-delay="500">
                      <CountUp start={0} end={50} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                      + Projects.
                    </li>
                    <li
                      className="lg:text-[20px] sm:text-[18px] text-[16px]"
                         data-aos-anchor=".hero-home"
                      data-aos="fade-up"
                      data-aos-delay="1000">
                      <CountUp start={0} end={100} delay={0}>
                        {({ countUpRef }) => <span ref={countUpRef} />}
                      </CountUp>
                      + Customers
                    </li>
                  </ul>
              </div>
            </div>
            <div className="video-wrpr sm:rounded-[15px] overflow-hidden">
              <Images
                imageurl={
                  page?.hero?.heroImage?.node?.sourceUrl &&
                  page?.hero?.heroImage?.node?.sourceUrl
                }
                styles={""}
                quality={100}
                width={"1700"}
                height={"1000"}
                title={
                  page?.hero?.heroImage?.node?.altText &&
                  page?.hero?.heroImage?.node?.altText
                }
                alt={
                  page?.hero?.heroImage?.node?.altText &&
                  page?.hero?.heroImage?.node?.altText
                }
                placeholder={true}
                classes={"block w-full object-cover"}
              />
            </div>
          </section>

          {/* <section className="py-[50px] section-1"> */}
          {/* <div className="container"> */}
          {/* <ul className="sm:flex items-center justify-between sm:[&>*]:text-[24px] text-[20px] text-center sm:text-start uppercase"> */}
          {/* <li data-aos="fade-up" className="sm:mb-0 mb-[8px]"> */}
          {/* <CountUp start={0} end={10} delay={0}> */}
          {/* {({ countUpRef }) => <span ref={countUpRef} />} */}
          {/* </CountUp> */}
          {/* + years */}
          {/* </li> */}
          {/* <li className="sm:mb-0 mb-[8px]" data-aos="fade-up" data-aos-delay="500"> */}
          {/* <CountUp start={0} end={50} delay={0}> */}
          {/* {({ countUpRef }) => <span ref={countUpRef} />} */}
          {/* </CountUp> */}
          {/* + Projects. */}
          {/* </li> */}
          {/* <li  data-aos="fade-up" data-aos-delay="1000"> */}
          {/* <CountUp start={0} end={100} delay={0}> */}
          {/* {({ countUpRef }) => <span ref={countUpRef} />} */}
          {/* </CountUp> */}
          {/* + Customers */}
          {/* </li> */}
          {/* </ul> */}
          {/* </div> */}
          {/* </section> */}

          <section className="relative grid text-center">
            <div
              className="container"
              data-aos="fade-up"
              data-aos-anchor=".section-1">
              <div className="overflow-hidden">
                <div className="grid  gap-[20px] ">
                  <div>
                    <h1
                      className="sm:text-[36px] text-[28px] mt-[20px] font-semi-bold mb-0"
                      dangerouslySetInnerHTML={{
                        __html:
                          page?.section1?.section1Heading1 &&
                          page?.section1?.section1Heading1,
                      }}
                    />

                    <h2
                      className="sm:text-[36px] text-[28px]  sm:mb-[30px] font-semi-bold mb-[20px]"
                      dangerouslySetInnerHTML={{
                        __html:
                          page?.section1?.section1Heading2 &&
                          page?.section1?.section1Heading2,
                      }}
                    />

                    <p
                      className="text-[16px]"
                      dangerouslySetInnerHTML={{
                        __html:
                          page?.section1?.section1Heading3 &&
                          page?.section1?.section1Heading3,
                      }}
                    />
                  </div>
                  <div>
                    <p
                      className="sm:text-[4vw] text-[32px] !leading-[1.4em] sm:mb-[50px] mb-[30px]"
                      dangerouslySetInnerHTML={{
                        __html:
                          page?.section1?.section1Heading4 &&
                          page?.section1?.section1Heading4,
                      }}
                    />

                    <Button
                      size="normal"
                      label={"Ok, Book my FREE Session! "}
                      icon={true}
                      action={mainFormModal}
                      classes={`mx-auto`}
                    />
                  </div>
                </div>

                {/* <Images
                imageurl={`https://demo.upturnist.com/wp-content/uploads/2024/11/lp-hero.webp`}
                styles={""}
                quality={100}
                width={"1700"}
                height={"1000"}
                alt={"Upturnist"}
                placeholder={true}
                classes={
                  "block w-full rounded-[15px]  lg:h-[70vh] object-cover"
                }
              /> */}
              </div>
            </div>
          </section>

          <section className="relative">
            <div className="container">
              <div className="reviews-wrpr">
                <div className="columns-1 sm:columns-2 xl:columns-3 gap-[30px]">
                  {_testimonial &&
                    _testimonial.map((item, key) => (
                      <Testimonial key={key} data={item} />
                    ))}
                </div>
              </div>
            </div>
          </section>
          <section className="sm:mb-[100px] mb-[30px] relative">
            <div className="container grid sm:gap-[50px] gap-[20px] text-center items-center">
              <h2
                className="heading-2 text-center mb-[30px]"
                data-aos="fade-up">
                {page?.section2?.section2Heading &&
                  page?.section2?.section2Heading}
              </h2>

              <div className="flex-container">
                {pageData?.data?.pages?.nodes[0]?.mainContentRepeaterFields &&
                  pageData?.data?.pages?.nodes[0]?.mainContentRepeaterFields.map(
                    (item, key) => {
                      return (
                        <div key={key} className="flex-item">
                          <FlipCard
                            title={item?.title}
                            desc={item?.description}
                            thumb={item?.image_url}
                          />
                        </div>
                      );
                    }
                  )}
              </div>
              <div>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      page?.section2?.section2Desc &&
                      page?.section2?.section2Desc,
                  }}
                />
              </div>
              <Button
                size="normal"
                label={"Ok, Book my FREE Session! "}
                icon={true}
                action={mainFormModal}
                classes={`mx-auto`}
              />
            </div>
          </section>

          <section className="sm:pt-[50px]">
            <div className="container" data-aos="fade-up">
              <div className="mx-auto">
                <VideosSlider data={_videosData} />
              </div>
            </div>
          </section>

          <section className="relative grid items-center" data-aos="fade-up">
            <div className="container">
              <div className="card rounded-[15px] grid lg:gap-[70px] gap-[30px] overflow-hidden">
                {/* <Images */}
                {/* imageurl={ */}
                {/* page?.section3?.section3Image?.node?.sourceUrl && */}
                {/* page?.section3?.section3Image?.node?.sourceUrl */}
                {/* } */}
                {/* styles={""} */}
                {/* quality={100} */}
                {/* width={"1700"} */}
                {/* height={"1000"} */}
                {/* alt={ */}
                {/* page?.section3?.section3Image?.node?.altText && */}
                {/* page?.section3?.section3Image?.node?.altText */}
                {/* } */}
                {/* placeholder={true} */}
                {/* classes={"block w-full lg:h-[70vh] object-cover"} */}
                {/* /> */}
                <div className="lg:py-[100px] lg:px-[100px] sm:py-[50px] sm:px-[50px] py-[30px] px-[30px]">
                  <h2 className="heading-3 sm:mb-[26px] mb-[10px]">
                    {page?.section3?.section3Heading &&
                      page?.section3?.section3Heading}
                  </h2>

                  <div className="grid sm:gap-[24px] gap-[16px]">
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          page?.section3?.section3Desc &&
                          page?.section3?.section3Desc,
                      }}
                    />
                    <div className="mt-[10px]">
                      <Button
                        size="normal"
                        label="Ok, Book my FREE Session!"
                        icon={true}
                        action={mainFormModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section
            className="relative grid items-center text-center"
            data-aos="fade-up">
            <div className="container">
              <div className="grid sm:gap-[70px] gap-[30px]">
                <Images
                  imageurl={
                    page?.section4?.section4Image?.node?.sourceUrl &&
                    page?.section4?.section4Image?.node?.sourceUrl
                  }
                  styles={""}
                  quality={100}
                  width={"1700"}
                  height={"1000"}
                  title={
                    page?.section4?.section4Image?.node?.altText &&
                    page?.section4?.section4Image?.node?.altText
                  }
                  alt={
                    page?.section4?.section4Image?.node?.altText &&
                    page?.section4?.section4Image?.node?.altText
                  }
                  placeholder={true}
                  classes={
                    "block w-full rounded-[15px] lg:h-[70vh] object-cover"
                  }
                />

                <div className="grid sm:gap-[20px] gap-[10px]">
                  <h2 className="heading-3">
                    {page?.section4?.section4Heading &&
                      page?.section4?.section4Heading}
                  </h2>

                  <div className="grid sm:gap-[24px] gap-[16px] [&>*]:leading-[1.9em]">
                    <ReadMore inMobile maxLength={40}>
                      {page?.section4?.section4Desc &&
                        page?.section4?.section4Desc}
                    </ReadMore>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* <section className="relative"> */}
          {/* <div className="container grid lg:gap-[50px] gap-[30px] text-center items-center"> */}
          {/* <h2 className="heading-2 text-center" data-aos="fade-up"> */}
          {/* {page?.packageHeading && page?.packageHeading} */}
          {/* </h2> */}
          {/*  */}
          {/* <div */}
          {/* className="lg:grid hidden grid-cols-1 xl:grid-cols-3 gap-[30px] package-wrpr-" */}
          {/* data-aos="fade-up"> */}
          {/* {packageData && */}
          {/* packageData.map((item, key) => ( */}
          {/* <div key={key}> */}
          {/* <Package */}
          {/* title={item.title} */}
          {/* packages={item.packages} */}
          {/* content={item.content} */}
          {/* viewMore={`${ */}
          {/* isExpanded */}
          {/* ? "max-h-[auto] view-full" */}
          {/* : "max-h-[250px] view-less" */}
          {/* }`} */}
          {/* /> */}
          {/* </div> */}
          {/* ))} */}
          {/* </div> */}
          {/* <div className="lg:flex hidden" data-aos="fade-up"> */}
          {/* <div className="bottom-expand "> */}
          {/* <span className="line-1"></span> */}
          {/* <button */}
          {/* className="btn btn-small relative z-1 whitespace-nowrap" */}
          {/* onClick={handleShowMorePackage}> */}
          {/* {isExpanded ? "View less" : "View more features"} */}
          {/* </button> */}
          {/* <span className="line-2"></span> */}
          {/* </div> */}
          {/* </div> */}
          {/* <div data-aos="fade-up"> */}
          {/* <ComparePackages data={packageData} /> */}
          {/* </div> */}
          {/* </div> */}
          {/* </section> */}

          <section className="relative grid items-center" data-aos="fade-up">
            <div className="container">
              <div className="card rounded-[15px] grid lg:gap-[70px] gap-[30px] overflow-hidden">
                <Images
                  imageurl={
                    page?.section5?.section5Image?.node?.sourceUrl &&
                    page?.section5?.section5Image?.node?.sourceUrl
                  }
                  styles={""}
                  quality={100}
                  width={"1700"}
                  height={"1000"}
                  title={
                    page?.section5?.section5Image?.node?.altText &&
                    page?.section5?.section5Image?.node?.altText
                  }
                  alt={
                    page?.section5?.section5Image?.node?.altText &&
                    page?.section5?.section5Image?.node?.altText
                  }
                  placeholder={true}
                  classes={"block w-full lg:h-[70vh] object-cover"}
                />
                <div className="lg:pb-[100px] lg:px-[100px] sm:pb-[50px] sm:px-[50px] pb-[30px] px-[30px]">
                  <h2 className="heading-3 sm:mb-[26px] mb-[10px]">
                    {page?.section5?.section5Heading &&
                      page?.section5?.section5Heading}
                  </h2>

                  <div className="grid sm:gap-[24px] gap-[16px]">
                    <p
                      dangerouslySetInnerHTML={{
                        __html:
                          page?.section5?.section5Desc &&
                          page?.section5?.section5Desc,
                      }}
                    />
                    <div className="mt-[10px]">
                      <Button
                        size="normal"
                        label="Ok, Book my FREE Session!"
                        icon={true}
                        action={mainFormModal}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="sm:mb-[100px] mb-[30px]" data-aos="fade-up">
            <div className="container">
              <h3 className="heading-2 text-center sm:mb-[70px] mb-[30px]">
                {page?.faqSection?.faqHeading && page?.faqSection?.faqHeading}
              </h3>
              <div className="faq-wrpr">
                {page?.faqSection?.faq && (
                  <Accordion data={page?.faqSection?.faq} />
                )}
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}