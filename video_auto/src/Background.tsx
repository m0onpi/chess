import { interpolate, useCurrentFrame,spring, AbsoluteFill, Img, staticFile,Audio,useVideoConfig,Sequence, Video } from "remotion"
import { AudioData, useAudioData, visualizeAudio } from "@remotion/media-utils";
import { loadFont, fontFamily } from "@remotion/google-fonts/Montserrat";

import {BrillSeq,Count} from "./Move"

const gameLink = 'https://www.chess.com/analysis/library/PhnXZTvAi?tab=review'
const one = gameLink.split('/')
const two  = one.slice(-1)[0]
const gameId = two.split('?')[0]
const moves = require(`../public/brilliant/brilliant_${gameId}.json`)
const last = moves.move.slice(-1)[0] + 5
const first = moves.move[1] 
loadFont("normal", {
  weights: ["400", "600", "800"],
  subsets: ["latin", "latin-ext"],
});




export const Background: React.FC = () =>{

    const frame = useCurrentFrame(); 
    const {fps} = useVideoConfig();
    const {durationInFrames} = useVideoConfig();
    const opacity = interpolate(frame, [0, 30,durationInFrames-30,durationInFrames-5], [0, 1,1,0])
    const zoom = interpolate(frame, [0, durationInFrames], [1, 1.5])
    const Ypath = spring({
        from: 0,
        to: 100,
        frame,
        fps,
        config: {mass: 10, damping: 110, stiffness: 350}
    })
    const up = interpolate(Ypath,[0,100,durationInFrames -100,durationInFrames],[0,100,100,-100])

  // I suggest using either 1024, or 512.
  // Larger number = finer details
  // Smaller number = faster computation





    return(
      <>
      <Sequence from ={0}>
    <div style = {{
    position: "absolute",
    width: "100%",
    height: "12%",
    bottom: "0%",
    background: "rgb(20,173,166,255)",
  }}
/>



<AbsoluteFill>   
  
    <Img src={staticFile(`moves/move_${first}.png`)} style = {{
    position: "relative",
    alignContent: "center",
    top: "22.5%"


    
     
        
}}/>
  <Count/>

</AbsoluteFill> 

</Sequence>

        <Sequence from={5}>

        <AbsoluteFill>   
          
        <BrillSeq/>
                
      
            
        </AbsoluteFill> 
        </Sequence>

        </>
        

      
    )
};
