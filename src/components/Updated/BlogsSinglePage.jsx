"use client";
import { frontendUrl } from "@/utils/variables";
import Layout from "@/components/Layout";
import { AOSInit } from "@/components/Aos";
import BlurAnimation from "@/components/BlurAnimation";
import Images from "@/components/Images";
import Link from "next/link";
import MetatagsBlogSingle from "@/components/SeoBlogSingle";
import TruncatedText from "@/components/TruncateWords";
import { useEffect } from "react";
import dynamic from "next/dynamic"; // Dynamically import useRouter
const { htmlToText } = require("html-to-text");
import { useThemeContext } from "@/context/themeContext";

// Dynamically import useRouter to ensure it only runs on the client
const useRouter = dynamic(() => import("next/router").then((mod) => mod.useRouter), { ssr: false });

export default function BlogsSinglePage({ singleBLogsData, blogSinglePageData, getAllBlogsData }) {
  const router = useRouter();
  const { theme } = useThemeContext();

  const singleBlog = singleBLogsData?.data?.allBlogs?.nodes[0] ?? null;
  const allBlogs = getAllBlogsData?.data?.allBlogs?.nodes ?? null;

  function formatBlogDate(date_) {
    const originalDate = new Date(date_);
    return originalDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  }

  const cleanHTML = (htmlString) => {
    return htmlToText(htmlString, {
      wordwrap: false,
    });
  };

  useEffect(() => {
    if (router) {
      const timeoutId = setTimeout(() => {
        if (!singleBlog) {
          router.push("/404");
        }
      }, 1000); // Delay in milliseconds (e.g., 1000ms = 1 second)

      // Cleanup function to clear the timeout if the component unmounts or dependencies change
      return () => clearTimeout(timeoutId);
    }
  }, [singleBlog, router]);

  return (
    <>
      {singleBlog && (
        <>
          <Layout>
            <AOSInit />
            <section className="sm:pt-[50px] pt-[20px] lg:pb-[15vh] pb-[50px]">
              <div className="container">
                <div className="grid gap-[30px] lg:max-w-[70%] mx-auto">
                  <div className="blog-single-" data-aos="fade-up">
                    <h1 className="heading-2">{singleBlog.title}​</h1>
                    <div className="my-[40px]">
                      <Images
                        imageurl={singleBlog.featuredImage?.node?.sourceUrl || "sample-link"}
                        styles={""}
                        quality={100}
                        width={"1000"}
                        height={"500"}
                        alt={singleBlog.featuredImage?.node?.altText || "no alt"}
                        title={singleBlog.featuredImage?.node?.altText || "no alt"}
                        placeholder={true}
                        classes={"w-full block rounded-[12px]"}
                      />
                    </div>
                    <div className="blog-content" dangerouslySetInnerHTML={{ __html: singleBlog.content }} />
                    <p className="text-[1rem] mt-[30px]">{formatBlogDate(singleBlog.date)}</p>
                  </div>
                  <div className="border-t border-[#ffffff14] sm:pt-[30px]">
                    <h3 className="sub-heading mb-[30px]">More blogs</h3>
                    <div className="inner-4">
                      <ul className="grid grid-cols-1 sm:grid-cols-2  gap-7">
                        {allBlogs &&
                          allBlogs
                            .filter((post) => post.slug !== singleBlog.slug)
                            .map((blog, key) => (
                              <li key={key} className="card card-effect rounded-[30px] overflow-hidden" data-aos="fade-up">
                                <Link
                                  title={`Read blog: ${blog.title}`}
                                  href={`${frontendUrl.replace(/\/$/, "")}/blogs/${blog.slug.replace(/^\//, "")}/`}
                                  key={key}
                                >
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
                                  <div className={`gap-[16px] px-[30px] pt-[20px] pb-[34px] grid`}>
                                    <h2 className={`text-[24px] mt-2`}>{blog.title}</h2>
                                    <div className="overflow-hidden">
                                      <p className="w-full block">
                                        <TruncatedText text={blog && cleanHTML(blog.content)} maxLength={200} />
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <BlurAnimation position="top right" />
            </section>
          </Layout>
        </>
      )}
    </>
  );
}