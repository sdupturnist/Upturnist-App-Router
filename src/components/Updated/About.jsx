"use client"
import Layout from "@/components/Layout";
import Metatags from "@/components/Updated/SeoInfo";
import { AOSInit } from "@/components/Aos";
import Images from "@/components/Images";
import TimelineDelivery from "@/components/TimelineDelivery";
import PageHeading from "@/components/PageHeading";
import ReadMore from "@/components/ReadMore";
import Timeline from "@/components/TimeLine";
import VideosSlider from "@/components/VideosSlider";
import { useThemeContext } from "@/context/themeContext";

export default function WhoWeAre({
  aboutPageData,
  coreValuesData,
  deliveryMethodData,
  teamsData,
  timelineData,
  videosData,
}) {
  const pageData = aboutPageData?.data?.pages?.nodes[0];
  const _coreValues = coreValuesData?.data?.allCoreValues?.nodes;
  const _deliveryMethod = deliveryMethodData?.data?.allDeliveryMethod?.nodes;
  const _teamsData = teamsData?.data?.teams?.nodes;
  const _timelineData = timelineData?.data?.allTimeLine?.nodes;
  const _videosData = videosData?.data?.allVideos?.nodes;

  const { theme } = useThemeContext();

  return (
    <>
      <Layout>
        <AOSInit />
   <div className="overflow-hidden">
      <PageHeading
          heading={pageData.title && pageData.title}
          subHeading={pageData.pages.subHeading && pageData.pages.subHeading}
          banner={
            aboutPageData &&
            aboutPageData?.data?.pages?.nodes[0]?.pages?.heroBanner?.node
              ?.sourceUrl
          }
        />

        <section
          className={`${
            theme === "dark" && "bg-box"
          } section-1 flex items-center text-center overflow-hidden`}
         >
          <div className="container mx-auto">
            <div className="grid gap-[5px] sm:max-w-[70%] mx-auto">
              <div
                data-aos="fade-up"
                className="item-1 [&>*]:mb-[20px] [&>*]:block"
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.aboutUs.aboutDescription1 &&
                    pageData.aboutUs.aboutDescription1,
                }}
              />
              <div
                data-aos="fade-up"
                data-aos-delay="500"
                className="item-2 [&>*]:mb-[20px] [&>*]:block"
                dangerouslySetInnerHTML={{
                  __html:
                    pageData.aboutUs.aboutDescription2 &&
                    pageData.aboutUs.aboutDescription2,
                }}
              />
            </div>
          </div>
        </section>

        <section data-aos="fade-up" className="section-2">
          <div className="container">
            <h3 className="heading-2 text-center sm:mb-[70px] mb-[30px]">
              {pageData.aboutUs.journeyHeading &&
                pageData.aboutUs.journeyHeading}
            </h3>
            <div className="mx-auto lg:max-w-[80%]">
              <Timeline data={_timelineData} />
            </div>
          </div>
        </section>

        <section
          className="relative grid items-center section-4 "
          data-aos="fade-up">
          <div className="container">
            <div className="card card-lg card-effect sm:p-[80px] p-[40px] rounded-[30px] flex flex-col items-center lg:flex-row sm:gap-[100px] gap-[30px]">
              <div className="flex-1 lg:order-1 order-2">
                <h2 className="heading-2 mb-[20px]">
                  {pageData.aboutUs.approchHeading &&
                    pageData.aboutUs.approchHeading}
                </h2>
                <ReadMore maxLength={500}>
                  {pageData.aboutUs.approachContent &&
                    pageData.aboutUs.approachContent}
                </ReadMore>
                <div></div>
              </div>
              <div className="image-box- mx-auto lg:order-2 order-1">
                <div className="line"></div>
                <Images
                  imageurl={
                    pageData.aboutUs.approchBanner.node.sourceUrl &&
                    pageData.aboutUs.approchBanner.node.sourceUrl
                  }
                  styles={""}
                  quality={80}
                  width={"600"}
                  height={"550"}
                  title={
                    pageData.aboutUs.approchBanner.node.altText &&
                    pageData.aboutUs.approchBanner.node.altText
                  }
                  alt={
                    pageData.aboutUs.approchBanner.node.altText &&
                    pageData.aboutUs.approchBanner.node.altText
                  }
                  placeholder={true}
                  classes={"block w-full"}
                />
              </div>
            </div>
          </div>
        </section>

        <section
          className=" relative grid items-center section-4 overflow-hidden"
          data-aos="fade-up">
          <div className="container">
            <div className="card card-lg card-effect sm:p-[80px] p-[40px] rounded-[30px] flex flex-col items-center lg:flex-row sm:gap-[100px] gap-[30px]">
              <div className="image-box- mx-auto">
                <div className="line"></div>
                <Images
                  imageurl={
                    pageData.aboutUs.marketingStrategy.node.sourceUrl &&
                    pageData.aboutUs.marketingStrategy.node.sourceUrl
                  }
                  styles={""}
                  quality={80}
                  width={"600"}
                  height={"550"}
                  title={
                    pageData.aboutUs.marketingStrategy.node.altText &&
                    pageData.aboutUs.marketingStrategy.node.altText
                  }
                  alt={
                    pageData.aboutUs.marketingStrategy.node.altText &&
                    pageData.aboutUs.marketingStrategy.node.altText
                  }
                  placeholder={true}
                  classes={"block w-full"}
                />
              </div>
              <div className="flex-1">
                <h2 className="heading-2 mb-[20px]">
                  {pageData.aboutUs.aboutBottomHeading &&
                    pageData.aboutUs.aboutBottomHeading}
                </h2>
                <div className="grid gap-[16px]">
                  <ReadMore maxLength={500}>
                    {pageData.aboutUs.aboutBottomDescription &&
                      pageData.aboutUs.aboutBottomDescription}
                  </ReadMore>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </section>

        <section className=" relative section-5">
          <div className="container grid lg:grid-cols-5 gap-[70px]"  data-aos="fade-up">
            <div className="lg:col-span-2 lg:sticky top-[50px] z-10">
              <h2
                className="heading-2 top-0 mb-[20px] text-center sm:text-start"
               >
                {pageData.aboutUs.coreValuesHeading &&
                  pageData.aboutUs.coreValuesHeading}
              </h2>
              <p className="para text-center sm:text-start">
                {pageData.aboutUs.coreValuesDescription &&
                  pageData.aboutUs.coreValuesDescription}
              </p>
            </div>

            <div className="lg:col-span-3">
              <ul className="grid md:grid-cols-2 gap-[30px] col-wrpr">
                {_coreValues &&
                  _coreValues.map((item, key) => {
                    return (
                      <li
                        key={key}
                        data-aos="fade-up"
                        className="card p-[34px] rounded-[30px]">
                        {item?.featuredImage && (
                          <div className="icon mb-[20px]">
                            <Images
                              imageurl={item?.featuredImage?.node?.sourceUrl}
                              quality={100}
                              width={"12"}
                              height={"12"}
                              title={
                                item?.featuredImage?.node?.altText &&
                                item?.featuredImage?.node?.altText
                              }
                              alt={
                                item?.featuredImage?.node?.altText &&
                                item?.featuredImage?.node?.altText
                              }
                              placeholder={true}
                              classes={"block h-[12px]"}
                            />
                          </div>
                        )}
                        <p dangerouslySetInnerHTML={{ __html: item.title }} />
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>

        <section className="section-6">
          <div className="container"  data-aos="fade-up">
            <h3
              className="heading-2 text-center sm:mb-[70px] mb-[30px]"
             >
              {pageData.aboutUs.videoHeading && pageData.aboutUs.videoHeading}
            </h3>
            <div className="mx-auto lg:max-w-[80%]">
              <VideosSlider data={_videosData} />
            </div>
          </div>
        </section>

        <section className="section-7" data-aos="fade-up">
          <div className="container">
            <h3 className="heading-2 text-center mb-[20px]">
              {pageData.aboutUs.deliveryMethodHeading &&
                pageData.aboutUs.deliveryMethodHeading}
            </h3>

            <div
              className="sm:mb-[70px] mb-[30px]"
              dangerouslySetInnerHTML={{
                __html:
                  pageData.aboutUs.deliveryMethodDescription &&
                  pageData.aboutUs.deliveryMethodDescription,
              }}
            />

            <div className="mx-auto lg:max-w-[80%]">
              <TimelineDelivery data={_deliveryMethod} />
            </div>
          </div>
        </section>

        <section
          className="relative grid items-center section-8 pt-0 lg:pb-[15vh] pb-[50px]"
          >
          <div className="container">
            <div className="mx-auto lg:max-w-[80%]">
              <h3
                className="heading-2 text-center sm:mb-[70px] mb-[30px]"
                data-aos="fade-up">
                {pageData.aboutUs.teamHeading && pageData.aboutUs.teamHeading}
              </h3>
              <div className="grid sm:gap-[100px] gap-[30px]">
                {_teamsData &&
                  _teamsData.map((team, key) => {
                    const columnOrder = key % 2 !== 0; // Check if the index is odd
                    return (
                      <div
                        key={key}
                        data-aos="fade-up"
                        className="card sm:p-[60px] p-[40px] rounded-[30px]">
                        {team.featuredImage && (
                          <Images
                            imageurl={
                              team.featuredImage.node.sourceUrl &&
                              team.featuredImage.node.sourceUrl
                            }
                            styles={""}
                            quality={80}
                            width={"150"}
                            height={"150"}
                            alt={
                              team.featuredImage.node.altText &&
                              team.featuredImage.node.altText
                            }
                            placeholder={true}
                            classes={
                              "block size-[100px] rounded-full object-cover mb-[30px] grayscale-[0.6] opacity-[0.8]"
                            }
                          />
                        )}
                        <div className="flex-1">
                          <h2 className="sub-heading mb-[8px]">{team.title}</h2>
                          <p className="mb-[20px]">{team.teamAcf.position}</p>
                          <div
                            dangerouslySetInnerHTML={{ __html: team.content }}
                          />

                          <div className="marquee mt-[30px]">
                            <div className="marquee-content gap-[10px]">
                              {team.teamAcf.intrested
                                .split("/")
                                .map((item, key) => {
                                  return (
                                    <div
                                      className="bg-[#8989890f] border-[#f9fafb1a] rounded-full py-[10px] px-[15px] whitespace-nowrap"
                                      key={key}>
                                      {item}
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                          <div></div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </div>
      </Layout>
    </>
  );
}