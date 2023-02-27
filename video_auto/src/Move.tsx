import { interpolate, useCurrentFrame,spring, AbsoluteFill, Img, staticFile,Audio,useVideoConfig,Sequence, Video } from "remotion"
import { loadFont, fontFamily } from "@remotion/google-fonts/Montserrat";


export const BrillSeq: React.FC = () => {
    const frame = useCurrentFrame(); 
    const {fps} = useVideoConfig();
    const {durationInFrames} = useVideoConfig();
    const gameLink = 'https://www.chess.com/analysis/library/PhnXZTvAi?tab=review'
    const one = gameLink.split('/')
    const two  = one.slice(-1)[0]
    const gameId = two.split('?')[0]
    const moves = require(`../public/brilliant/brilliant_${gameId}.json`)
    const last = moves.move.slice(-1)[0] + 5
    const first = moves.move[1] 
    const N = last - first
    const moveList = Array.from({length: N}, (_, index) => index + 1);
    
    
    return(
        <>    
        {moveList.map((move,index) =>(
        <Sequence from={(3+move)*fps}>

    <AbsoluteFill>
    <Img key ={index} src={staticFile(`moves/move_${first+move-1}.png`)} style = {{
            position: "relative",
            alignContent: "center",
            top: "22.5%"
                
        }}/>
    

    </AbsoluteFill>

        </Sequence>))}

        </>
    
    
    )
    
}

export const Count: React.FC = () => {
    const frame = useCurrentFrame(); 
    const {fps} = useVideoConfig();
    const {durationInFrames} = useVideoConfig();
    
    const N = 5

    const moveList = Array.from({length: N}, (_, index) => index + 1).reverse();
    moveList
    
    
    return(
        <>    
        {moveList.map((move,index) =>(
        <Sequence from={(5-move)*fps}>

    <AbsoluteFill>
    <div  key={index}style={{ 
            position: "relative",
            fontFamily: fontFamily,
            fontSize: 80,          
            color: "black",
            textAlign: "center",
            
            
            
            
         }}>
              
         <p>
         {moveList[index]}
        </p>


        </div>
    

    </AbsoluteFill>

        </Sequence>))}

        </>
    
    
    )
    
}
    
