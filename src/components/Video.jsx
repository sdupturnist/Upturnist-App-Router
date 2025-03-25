import { useEffect } from "react";



export default function Video({url}){


    
  useEffect(() => {
    // Get the video element by its class name
    const video = document.getElementsByClassName('video-player')[0];

    // Function to attempt to play the video
    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.error('Error attempting to play the video:', error);
      }
    };

    // Force play after component mounts
    if (video) {
      playVideo();
    }
  }, []); // Empty dependency array to run only once on mount




    return(
        <>
         {/* <video
                      className="video_"
                      src={url}
                      controls
                      muted
                      autoPlay
                      loop>
                      video tag is not supported by your browser
                    </video> */}


                    <video className="video-player"  width="1200" height="1000"  autoplay loop muted playsInline>
      <source  src={url} type="video/mp4" />
      <track
        src="/path/to/captions.vtt"
        kind="subtitles"
        srcLang="en"
        label="English"
      />
      Your browser does not support the video tag.
    </video>

        </>
    )
}