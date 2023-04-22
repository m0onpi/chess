import { interpolate, useCurrentFrame,spring, AbsoluteFill, Img, staticFile,Audio,useVideoConfig,Sequence, Video } from "remotion"
import { AudioData, useAudioData, visualizeAudio } from "@remotion/media-utils";
import { loadFont, fontFamily } from "@remotion/google-fonts/Montserrat";

import {BrillSeq,Count} from "./Move"
const info = require(`../public/myfile.json`)
const lol = info.brilliant_pos.length -1 
const first = info.brilliant_pos[lol] -1
const last = info.moves.length
loadFont("normal", {
  weights: ["400", "600", "800"],
  subsets: ["latin", "latin-ext"],
});



/// <Video src={staticFile(`output_VP8.webm`)}/>///

export const Background: React.FC = () =>{
  const {durationInFrames} = useVideoConfig();
  


  // I suggest using either 1024, or 512.
  // Larger number = finer details
  // Smaller number = faster computation





    return(
      <>
      <Video src={staticFile("fractal.mp4")}/>
      <Sequence >
      


<Img  src ={staticFile("logo2.png")} style = {{
            position: "relative",
            height: "10%",
            left: "80%",
            bottom: "-1.5%",
            borderRadius:"50%",
            boxShadow:" 0 0 15px 15px rgba(0, 0, 0, 0.5)"

          }}
        />
<AbsoluteFill>   
  
    <Img src={staticFile(`moves/move_${first}.png`)} style = {{
    position: "absolute",
    alignContent: "center",
    top: "23.5%",
    boxShadow:" 0 0 45px 45px rgba(0, 0, 0, 1)",
    width:"97.5%",
    right:"1.25%",
     
        
}}/>


  <Audio volume={1.5} src={staticFile(`canyoufind.mp3`)}/>
  <Count/>
  <Audio volume={1.5} src={staticFile(`music1.mp3`)}/>

</AbsoluteFill> 

</Sequence>

        <Sequence>

        <AbsoluteFill>   
        <BrillSeq/>
            
        </AbsoluteFill> 
        </Sequence>


        </>
        

      
    )
};
