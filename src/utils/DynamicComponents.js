import dynamic from 'next/dynamic';


export const PortfolioSlider = dynamic(() => import('../components/WorkSlider'), {
    ssr: false,
  });


  export const TestimonialSlider = dynamic(() => import('../components/TestimonialSlider'), {
    ssr: false,
  });



  export const HeroContent = dynamic(() => import('../components/HeroDescription'), {
    ssr: false,
  });


  export const HomeVideoBox = dynamic(() => import('../components/HomeVideo'), {
    ssr: false,
  });