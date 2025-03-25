import { AOSInit } from '@/components/Aos'
import Layout from '@/components/Layout'
import Link from 'next/link'
import { frontendUrl } from '@/utils/variables'
import { generateMetadata as generateMetadataFromLib } from "@/lib/generateMetadata"; 

export default function ThankyouSubscribe() {
    return (
        <Layout>
            <AOSInit />
            <section className="h-[80vh] flex items-center overflow-hidden relative text-center thankyou-page-content">
                <div className="container z-10 relative">
                    <div className="grid gap-[20px]">
                        <h1 className="heading-1" data-aos="fade-up">Thank You for Subscribing!</h1>
                        <p data-aos="fade-up" data-delay="500">
                            You’ve successfully subscribed to our newsletter! We’ll keep you updated with the latest news, offers, and insights.
                            Stay tuned for exciting updates!
                        </p>
                        <Link
                            title="Back to home"
                            aria-label="Back to home"
                            href={frontendUrl}
                            className="btn btn-normal mx-auto">
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
export async function generateMetadata() {
    return generateMetadataFromLib('', true, 'thankyou-subscribe');
  }