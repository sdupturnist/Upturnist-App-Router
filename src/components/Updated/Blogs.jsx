"use client"
import { frontendUrl} from "@/utils/variables";
import Layout from "@/components/Layout";
import Metatags from "@/components/Updated/SeoInfo";
import Link from "next/link";
import BlurAnimation from "@/components/BlurAnimation";
import { AOSInit } from "@/components/Aos";
import Images from "@/components/Images";
import PageHeading from "@/components/PageHeading";
import TruncatedText from "@/components/TruncateWords";
const { htmlToText } = require("html-to-text");
import { useThemeContext } from "@/context/themeContext";
export default function Blogs({ blogPageDatas, getAllBlogsData }) {
  const pageData = blogPageDatas.data.pages.nodes[0];
  const allBlogs = getAllBlogsData.data.allBlogs.nodes;




  const cleanHTML = (htmlString) => {
    return htmlToText(htmlString, {
      wordwrap: false,
    });
  };

  return (
    <>
      <Layout>
        <AOSInit />

        <PageHeading
          heading={pageData.title && pageData.title}
          subHeading={pageData.pages.subHeading && pageData.pages.subHeading}
        />

        <section className="section-1 lg:pb-[15vh] pb-[50px]" >
          <div className="container mx-auto">
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {" "}
              {/* Adjusted to use a grid layout with 30px gap */}
              {allBlogs &&
                allBlogs.map((blog, key) => (
                  <li
                    key={key}
                     data-aos="fade-up"
                    className="card card-effect rounded-[30px] overflow-hidden">
                    <Link
                      title={`Read blog: ${blog.title}`}
                      href={`${frontendUrl.replace(/\/$/, '')}/blogs/${blog.slug.replace(/^\//, '')}/`}
                      key={key}>
                      {blog.featuredImage && (
                        <Images
                          imageurl={blog.featuredImage.node.sourceUrl}
                          styles={""}
                          quality={100}
                          width={500}
                          height={500}
                          alt={blog.featuredImage.node.altText}
                          placeholder={true}
                          classes={`block w-full`}
                        />
                      )}
                      <div
                        className={`gap-[16px] px-[30px] pt-[20px] pb-[34px] grid `}>
                        <h2
                          className={`text-[24px] mt-2`}>
                          {blog.title}
                        </h2>
                        <div className="overflow-hidden">
                          <p className="w-full block">
                            <TruncatedText
                              text={blog && cleanHTML(blog.content)}
                              maxLength={200}
                            />
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </section>
      </Layout>
    </>
  );
}