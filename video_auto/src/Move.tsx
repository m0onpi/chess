import { interpolate, useCurrentFrame,spring, AbsoluteFill, Img, staticFile,Audio,useVideoConfig,Sequence, Video,Series } from "remotion"
import { loadFont, fontFamily } from "@remotion/google-fonts/Montserrat";
import { Gif } from "@remotion/gif";
import { useState } from "react";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css'

loadFont("normal", {
    weights: ["400"],
    subsets: ["latin", "latin-ext"],
  });
export const BrillSeq: React.FC = () => {
    const frame = useCurrentFrame(); 
    const {fps} = useVideoConfig();
    const {durationInFrames} = useVideoConfig();
    const info = require(`../public/myfile.json`)
    const lol = info.brilliant_pos.length -1 
    const first = info.brilliant_pos[lol] -1
    const last = info.moves.length
    const N = last - first
    const moveList = Array.from({length: N}, (_, index) => index + 1);
    const brillList =  info.brilliant_pos
    return(
        <>    
        {moveList.map((move,index) =>(
        <Sequence from={(10+move)*fps}>
    <AbsoluteFill>
    <Img key ={index} src={staticFile(`moves/move_${first+move}.png`)} style = {{
            position: "absolute",
            alignContent: "center",
            top: "23.5%",
            right:"1.25%",
            width:"97.5%",
            borderWidth:"5px"
                
        }}/>
    <Audio key = {index} src ={staticFile(`${info.soundFile[first+move-1]}`)}/>
        
    </AbsoluteFill>
        </Sequence>))}
        
        </>
    )
    
}

export const Count: React.FC = () => {
    const n = 11
    const countdown = Array.from({length: n}, (_, index) => n - index);
    const {fps} = useVideoConfig();
    const info = require(`../public/myfile.json`)
    const lol = info.brilliant_pos.length -1 
    const first = info.brilliant_pos[lol] -1
    const last = info.moves.length
    const N = last - first

    return (
        <>
        <Series>
            <Series.Sequence durationInFrames={(n-1)*fps}>
                {countdown.map((count,index) =>(
        <Sequence from={(index-1)*fps}> 
    <AbsoluteFill>
                    <div style={{ width: 300, height: 300, position:"absolute", left:"35%",top:"3%"}}>
    <CircularProgressbar value={(index)*10}  styles={buildStyles({
    // Rotation of path and trail, in number of turns (0-1)
    rotation: 0.25,

    // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
    strokeLinecap: 'butt',
    pathTransitionDuration: 0.5,
    // Text size

    // How long animation takes to go from one percentage to another, in seconds

    // Can specify path transition in more detail, or remove it entirely
    // pathTransition: 'none',

    // Colors
    pathColor: `rgba(255, 255, 255, 1)`,
    trailColor: 'rgba(0, 0, 0, 1)',
    backgroundColor: '#3e98c7',
  })} />
    </div>
    </AbsoluteFill>
        </Sequence>
        ))}
        </Series.Sequence>
        <Series.Sequence durationInFrames={((N + 12) * 30)-(9*30)}>
        <div style={{ 
            position: "absolute",
            fontFamily,
            fontSize: 80,          
            color: "white",
            bottom: "5%",
            right:"8%",
            textAlign: "center",
            fontWeight: "600",
            width: "85%",
            
            
         }}>
  <p> Like ❤ and comment if you found it !  </p>
</div>
        </Series.Sequence>
        </Series>



      </>
      
      
    );
  };
    

