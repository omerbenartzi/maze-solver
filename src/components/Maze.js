import React, {useState} from 'react';
import Tile from './Tile';
import Grid from '@material-ui/core/Grid';

const Maze = (props) => {

    const mazeMatrix = props.mazeMatrix;

    const setMazeMatrix = props.setMazeMatrix;
    const [mouseIsDown, setMouseIsDown] = useState(false);
    const redPoint = props.redPoint;
    const setRedPoint = props.setRedPoint;

    const onTileClick = (y, x) => e => {
        e.preventDefault();
    
        
        if (props.state === 1) {
            if (redPoint >= 2) {
                return;
            } else {
                if (mazeMatrix[y][x] !== 1) {
                    setRedPoint(redPoint + 1);
                }
            }
        } else {
            if (mazeMatrix[y][x] === 1) {
                setRedPoint(redPoint - 1);
            }

            mazeMatrix[y][x] = props.state;
            setMazeMatrix(Array.from(mazeMatrix));
            return;
        }

        mazeMatrix[y][x] = props.state;
        setMazeMatrix(Array.from(mazeMatrix));
        
    };

    const onMouseMove = (y, x) => e => {
        e.preventDefault();
        
        if (!mouseIsDown) {
            return;
        }

        if (props.state === 1) {
            if (redPoint >= 2) {
                return;
            } else {
                if (mazeMatrix[y][x] !== 1) {
                    setRedPoint(redPoint + 1);
                }
            }
        } else {
            if (mazeMatrix[y][x] === 1) {
                setRedPoint(redPoint - 1);
            }

            mazeMatrix[y][x] = props.state;
            setMazeMatrix(Array.from(mazeMatrix));
            return;
        }

        mazeMatrix[y][x] = props.state;
        setMazeMatrix(Array.from(mazeMatrix));
    }

    const width = mazeMatrix[0].length;
    const height = mazeMatrix.length;
    const tileWidth = width * height > 256 ? 16 : 32;
    const tileHeight = width * height > 256 ? 16 : 32;

    const drawMaze = () => {
        return mazeMatrix.map((row, rIndex) => (
            <Grid key={rIndex} container item direction="row">
             {row.map((cell, cIndex) => (
                <Grid onMouseDown ={onTileClick(rIndex, cIndex)} onMouseEnter={onMouseMove(rIndex, cIndex)} id={rIndex + "_" + cIndex} key={rIndex + "_" + cIndex} item><Tile  width={tileWidth} height={tileHeight} state={cell}></Tile></Grid>
            ))}
            </Grid>
        ))
    }

    return (
        <div>
            <Grid onMouseDown={e => { e.preventDefault();setMouseIsDown(true)}} onMouseUp={e => setMouseIsDown(false)}   container>
                {drawMaze()}
            </Grid>
            
        </div>
    );
};

export default Maze;