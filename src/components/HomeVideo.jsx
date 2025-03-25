import { useModalContext } from "@/context/modalContext";
import ReactPlayer from "react-player"




export default function HomeVideo({data, url}){


    const { setModalFor, setShowModal, setModalData } = useModalContext();

    const openVideoModal = () => {
        setShowModal(true);
        setModalFor("video");
        setModalData(data?.videosAcf?.link)
      };


    return(
       <div
       data-test={data?.videosAcf?.link}
       onClick={openVideoModal}
       className="home-video-preview sm:size-[500px] h-[320px] aspect-video overflow-hidden rounded-[32px] border cursor-pointer">
       <ReactPlayer
              muted
              playing
              loop
              playsinline
              url={
               url && url
              }
            />
       </div>
    )
}