import { useThemeContext } from "@/context/themeContext";
import AnimatedTextCharacter from "./AnimatedText";
import Images from "./Images";

export default function PageHeading({ heading, subHeading, banner }) {
  const { theme } = useThemeContext();

  return (
    <>
      <section
        className={`${
          theme === "light" ? "" : "bg-box"
        } hero-home flex items-center text-center sm:pt-[100px] pt-[30px]`}>
        <div className="container mx-auto">
          <div className="grid sm:gap-[30px]">
            <div className="grid gap-[10px]">
              <h1 data-aos="fade-up" className="heading-1">
                <span className="block">
                  <AnimatedTextCharacter text={heading && heading} />
                </span>
              </h1>
              <p
                data-aos="fade-up"
                data-delay="500"
                className="sm:max-w-[70%] mx-auto"
                dangerouslySetInnerHTML={{ __html: subHeading && subHeading }}
              />
            </div>

            {banner && (
              <div data-aos="fade-up">
                <Images
                  imageurl={banner}
                  styles={""}
                  quality={100}
                  width={"1700"}
                  height={"1000"}
                  alt={heading}
                  placeholder={true}
                  classes={
                    "block w-full rounded-[15px] sm:h-[70vh] object-cover mt-[50px]"
                  }
                />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
