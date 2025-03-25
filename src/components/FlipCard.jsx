import React, { useState } from "react";
import Images from "./Images";

const FlipCard = ({ title, desc, thumb }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleMouseEnter = () => setIsFlipped(true);
  const handleMouseLeave = () => setIsFlipped(false);

  return (
    <div
      className="perspective-1000"
      data-aos="fade-up">
      <div
        className="w-[100%] h-[400px] relative group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        {/* Card */}
        <div
          className={`w-full h-full card border-0 rounded-[24px] grid items-center transition-all duration-500 transform-style-preserve-3d ${
            isFlipped ? "flip" : ""
          }`}>
          {/* Front Side */}
          <div className="absolute inset-0 bg-white rounded-[24px] justify-center grid items-center transform-style-preserve-3d overflow-hidden">
            <div>
              <Images
                imageurl={thumb}
                styles={""}
                quality={100}
                width={"200"}
                height={"200"}
                alt={"Upturnist"}
                placeholder={true}
                classes={"block rounded-full size-[170px] object-cover mx-auto"}
              />
              <h3 className="text-[18px] m-[30px]">{title}</h3>
            </div>
          </div>

          {/* Back Side */}
          <div
            className={`absolute inset-0 bg-white rounded-[24px] grid justify-center items-center transform-style-preserve-3d back-face py-[30px] px-[50px]`}>
            <div>
              <h3 className="text-[18px] m-[30px] font-semibold">{title}</h3>
              <p
                className="text-[16px] [&>*]:text-[16px] px-4 text-center"
                dangerouslySetInnerHTML={{
                  __html: desc && desc,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
