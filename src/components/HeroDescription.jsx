import AnimatedTextCharacter from "@/components/AnimatedText";
import Button from "./Buttons";
import { useThemeContext } from "@/context/themeContext";

export default function HeroDescription({
  title,
  animatedHeading,
  desc,
  modalAction,
  buttonLabel
}) {
  const { theme } = useThemeContext();

  return (
    <>
      <span data-aos="fade-up" className="heading-1 h2">
        {title}
        <span className="block">
          <AnimatedTextCharacter text={animatedHeading} />
        </span>
      </span>
      {desc && (
        <p
          data-aos="fade-up"
          className="first-letter:capitalize sm:[&>*]:text-[20px] text-[20px]"
          dangerouslySetInnerHTML={{ __html: desc }}
        />
      )}
      {buttonLabel && (
        <div className="mt-3 flex items-center">
          <Button
            size="normal"
            label={buttonLabel}
            icon={true}
            action={modalAction}
            classes={`lg:m-0 mx-auto`}
          />
        </div>
      )}
    </>
  );
}
