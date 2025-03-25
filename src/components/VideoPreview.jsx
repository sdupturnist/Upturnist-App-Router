import Link from "next/link";
import Images from "./Images";
import { useModalContext } from "@/context/modalContext";

export default function VideoPreview({ data, type, classes, desc, theme }) {
  const { setModalFor, setShowModal, setModalData } = useModalContext();

  const openVideoModal = () => {
    setShowModal(true);
    setModalFor("video");
    setModalData(data?.videosAcf?.link);
  };

  return (
    <>
      {theme === "dark" ? (
        <div
          className={`${
            type == "small"
              ? "lg:w-[250px] lg:h-[300px] sm:rounded-[30px]"
              : "lg:w-[380px] lg:h-[450px] sm:rounded-[40px]"
          } card overflow-hidden card-about-video rounded-[30px]  w-[90%] mx-auto  shadow-box grid datas-end ${classes}`}>
          <div>
            <Images
              imageurl={
                data.featuredImage.node.sourceUrl &&
                data.featuredImage.node.sourceUrl
              }
              styles={""}
              quality={80}
              width={"250"}
              height={"250"}
              alt={
                data.featuredImage.node.altText &&
                data.featuredImage.node.altText
              }
              placeholder={true}
              classes={"block w-full"}
            />

            <div
              data-test={data?.videosAcf?.link}
              onClick={openVideoModal}
              className="grid datas-end absolute inset-0 p-[30px] gradient-bottom-card cursor-pointer">
              <span className={`${desc ? "items-end" : "items-center"} grid`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="29"
                  className="mx-auto"
                  fill="none"
                  viewBox="0 0 24 29">
                  <path
                    fill="#fff"
                    d="M0 25.226V3.07C0 .707 2.604-.728 4.602.533L22.013 11.53c1.857 1.173 1.866 3.877.017 5.062L4.62 27.751C2.622 29.031 0 27.597 0 25.225Z"
                    opacity=".5"
                  />
                </svg>
                {desc && <p className="small">{data.title}</p>}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="lg:max-w-[450px] w-[100%]">
          <Images
            imageurl={
              data.featuredImage.node.sourceUrl &&
              data.featuredImage.node.sourceUrl
            }
            styles={""}
            quality={100}
            width={"400"}
            height={"400"}
            alt={
              data.featuredImage.node.altText && data.featuredImage.node.altText
            }
            placeholder={true}
            classes={"block w-full rounded-[16px] width-[70%]"}
          />

          <div
            data-test={data?.videosAcf?.link}
            onClick={openVideoModal}
            className="grid datas-end absolute inset-0 p-[30px] pb-[60px] cursor-pointer rounded-[16px] overflow-hidden">
            <span className="items-center grid">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="29"
                className="mx-auto"
                fill="none"
                viewBox="0 0 24 29">
                <path
                  fill="#fff"
                  d="M0 25.226V3.07C0 .707 2.604-.728 4.602.533L22.013 11.53c1.857 1.173 1.866 3.877.017 5.062L4.62 27.751C2.622 29.031 0 27.597 0 25.225Z"
                  opacity=".5"
                />
              </svg>
            </span>
          </div>
          {desc && <p className="text-[15px] mt-[16px]">{data.title}</p>}
        </div>
      )}
    </>
  );
}
