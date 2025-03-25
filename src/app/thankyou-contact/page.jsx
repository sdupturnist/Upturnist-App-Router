
import Link from 'next/link'
import Layout from '@/components/Layout'
import { AOSInit } from '@/components/Aos'
import AnimatedTextCharacter from '@/components/AnimatedText'
import { frontendUrl } from '@/utils/variables'
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 

export default function ThankyouContact() {
    return (
        <>

<Layout>
        <AOSInit />
        
        <section className="h-[80vh] flex items-center overflow-hidden relative text-center">
          <div className="container z-10 relative">
            <div className="grid gap-[20px]">
            <h1 className="md:text-[3.5rem] sm:text-[3rem] text-[2rem] leading-tight" data-aos="fade-up">We appreciate your time to<span className="block">
                        <AnimatedTextCharacter textalign={'center'} text="share your details" />
                        </span>
                        </h1>
                        <p className="md:text-[1.6rem] text-[1rem]" data-aos="fade-up" data-delay="500">Thank you for contacting us. We&apos;ll get back to you very soon</p>
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
    )
}
export async function generateMetadata() {
  return generateMetadataFromLib('', true, 'thankyou-contact');
}