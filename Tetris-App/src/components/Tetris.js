
//CSS
import './Tetris.css'

//Interesting...
import { useRef } from 'react';
import Webcam from 'react-webcam';
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
//Components
import TetrisStats from '../components/TetrisStats';
import { Board } from '../components/Board'
import { Previews } from '../components/Previews'
import { GameController } from '../components/GameController';

//Hooks
import { useBoard } from '../hooks/useBoard';
import { useTetrisStats } from '../hooks/useTetrisStats'
import { usePlayer } from '../hooks/usePlayer'


export function Tetris({rows, cols, setGameOver})
{
    const [tetrisStats, addLinesCleared] = useTetrisStats();
    const [player, setPlayer, resetPlayer] = usePlayer();
    const [board] = useBoard({rows, cols, player, resetPlayer, addLinesCleared})

    const webcamRef = useRef(null)
    const canvasRef = useRef(null)
    // async function loadModel(){
    //     // const model = await tf.loadLayersModel("C:\Users\rahul\Downloads\Vision-Kinect-main\Tetris-App\src\best_saved_model");
    //     const model = await tf.loadLayersModel("C:\Users\rahul\Downloads\detect-tfjs-fp32");
    //     console.log("Model loaded");
    // }
    const runHandpose = async () => {
        const net = await handpose.load();
        console.log("Handpose model loaded.");
        //  Loop and detect hands
        // setInterval(() => {
        //   detect(net);
        // }, 10);
      };
    
    // runHandpose()
    //<CamControl /> needs to be implemented
    return (
        <div className='Tetris'>
            <Webcam className='Webcam' ref={webcamRef} mirrored={true}/>

            <canvas className='Canvas' ref={canvasRef}></canvas>
            <Board board={board}/>
            <TetrisStats tetrisStats={tetrisStats}/>
            <Previews tetrominoes={player.tetrominoes} />
            <GameController board={board} tetrisStats={tetrisStats} player={player} setGameOver={setGameOver} setPlayer={setPlayer} />
        </div>
    );
}
