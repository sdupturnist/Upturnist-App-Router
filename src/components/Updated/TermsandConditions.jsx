"use Client"
import Layout from "@/components/Layout";
import { AOSInit } from '@/components/Aos';
import BlurAnimation from '@/components/BlurAnimation';
import Metatags from "@/components/Updated/SeoInfo";

export default function TermsandConditions({ privacyPolicyData_ }) {


    const page = privacyPolicyData_.data.pages.nodes[0]



    return (
        <>
            <Layout>
                <AOSInit />
                <section className="sm:py-20 py-6 relative overflow-hidden" data-aos="fade-up">
                    <div className="container z-10 relative">
                        <div className="grid flex-row gap-10 ">
                            <div className="lg:w-[60%] items-center mx-auto grid gap-10">
                                <h1 className="lg:text-[3.5rem] md:text-[3rem] sm:text-[2rem] text-[2rem] leading-tight md:mb-5">{page.title && page.title}​</h1>
                                <div className="grid gap-3 common-page" dangerouslySetInnerHTML={{ __html: page.content && page.content }} />
                            </div>
                        </div>
                    </div>
                    <BlurAnimation position="top right" />
                </section>
            </Layout>
        </>
    );
}