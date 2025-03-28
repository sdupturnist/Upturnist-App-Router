
import Link from 'next/link'
import AnimatedTextCharacter from '@/components/AnimatedText'
import { AOSInit } from '@/components/Aos'
import BackgroundAnimation from '@/components/BackgroundAnimation'
import BlurAnimation from '@/components/BlurAnimation'
import Layout from '@/components/Layout'
import { frontendUrl } from "@/utils/variables";


export default function Download() {
    return (
        <>
           <Layout>
            <AOSInit />
            <section style={{ marginTop: '-120px' }} className="hero sm:h-screen h-[80vh] flex items-center sm:py-20 py-6 overflow-hidden relative text-center">
                <BlurAnimation position="bottom left" />
                <div className="container z-10 relative">
                    <div className="grid gap-8">
                        <svg
                            id="successAnimation"
                            className="animated mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width={70}
                            height={70}
                            viewBox="0 0 70 70"
                        >
                            <path
                                id="successAnimationResult"
                                fill="#2FA4D8"
                                d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
                            />
                            <circle
                                id="successAnimationCircle"
                                cx={35}
                                cy={35}
                                r={24}
                                stroke="#2FA4D8"
                                strokeWidth={2}
                                strokeLinecap="round"
                                fill="transparent"
                            />
                            <polyline
                                id="successAnimationCheck"
                                stroke="#fff"
                                strokeWidth={2}
                                points="23 34 34 43 47 27"
                                fill="transparent"
                            />
                        </svg>

                        <h1 className="md:text-[3.5rem] sm:text-[3rem] text-[2rem] leading-tight" data-aos="fade-up">We appreciate your time to<span className="block">
                        <AnimatedTextCharacter textalign={'center'} text="share your details" />
                        </span>
                        </h1>
                        <p className="md:text-[1.6rem] text-[1rem]" data-aos="fade-up" data-delay="500">Thank you for downloading. You will receive it in your inbox…</p>
                        <Link title="Go to home" aria-label="Go to home"  href={frontendUrl} className='btn mx-auto mt-5 flex items-center'>Go to home</Link>
                    </div>
                </div>
                <BackgroundAnimation />
            </section>
            </Layout>
        </>
    )
}
