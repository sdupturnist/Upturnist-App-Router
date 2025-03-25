import BlurAnimation from "@/components/BlurAnimation";
import BackgroundAnimation from "@/components/BackgroundAnimation";
import { AOSInit } from "@/components/Aos";
import AnimatedTextCharacter from "@/components/AnimatedText";
import Layout from "@/components/Layout";
import Link from "next/link";
import { frontendUrl } from "@/utils/variables";

export default function PageNotFound() {
  return (
    <>
      <Layout>
        <AOSInit />
        <section className="h-[80vh] flex items-center overflow-hidden relative text-center">
          <div className="container z-10 relative">
            <div className="grid gap-[20px]">
              <h1
                className="lg:text-[4rem] md:text-[4rem] sm:text-[3rem] text-[2rem] leading-tight"
                data-aos="fade-up">
                Oops! page not found
              </h1>
              <p
                className="md:text-[1.6rem] text-[1rem] mb-[20px]"
                data-aos="fade-up"
                data-delay="500">
                The page you are looking for does not exist. Go back to the main
                page.
              </p>
              <Link
                title="Back to home"
                aria-label="Back to home"
                href={frontendUrl}
                className="btn btn-normal mx-auto ">
                Back to home
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
