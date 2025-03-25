import Images from '@/components/Images';


export default function ShapeAnimation({large}) {
    return (
        <>
  <div className={`${!large ? "block sm:hidden" : 'large'} shape-animation-wrpr`}>

  <Images
                    imageurl={'/images/video2.webp'}
                    styles={''}
                    quality={100}
                    width={'600'}
                    height={'600'}
                    alt={'SEO expert Dubai'}
                    placeholder={false}
                    classes={'frame-1 block sm:w-[75%] w-[95%] mx-auto'}
                  />

            
            </div>
        </>
    )
}
