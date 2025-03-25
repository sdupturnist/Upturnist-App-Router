import Link from "next/link";
import { useThemeContext } from "@/context/themeContext";

export default function TimelineDelivery(data) {
  const { theme } = useThemeContext();
  const timelineData = data.data;



 

  return (
    <>
      <div className="timeline realtive">
        <ul className="outer">
          {timelineData &&
            timelineData.map((item, key) => {
              const isOddItem = key % 2 !== 0; // Check if the index is odd

              return (
                <li className={`card-`} key={key}>
                  <div className={`sm:p-20 p-5 relative z-10`}>
                    <span
                      className={`${
                        theme === "dark"
                          ? "border-[#fff] text-[#13589c] bg-[#fff]"
                          : "border border-black text-black bg-white"
                      } year text-[#13589c] bg-[#fff] border-[2px] ${
                        isOddItem ? " !right-[-57px] !left-auto" : ""
                      }`}>
                      {key + 1}
                    </span>

                    <div 
                       className="content" 
                       data-aos={isOddItem ? "fade-right" : "fade-left"}>
                    <h3 className={`title sub-heading mb-3 capitalize`}>
                        {item.title}
                      </h3>
                      <p
                        className={`md:text-[1.125rem] text-[1rem]`}
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
