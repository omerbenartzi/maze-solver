import React, {useState} from 'react';
import Tile from './Tile';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';

const Maze = (props) => {
    const [mazeMatrix, setMazeMatrix] = useState(Array.from(Array(props.height), () => Array(props.width).fill(0)));
    const [redPoint, setRedPoint] = useState(0);
    const [mouseIsDown, setMouseIsDown] = useState(false);

    const reset = () => {
        setRedPoint(0);
        setMazeMatrix(Array.from(Array(props.height), () => Array(props.width).fill(0)));
    }

    const clearSolution = () => {
        for (var i = 0; i < mazeMatrix.length; i++) {
            for (var j = 0; j < mazeMatrix[0].length; j++) {
                if (mazeMatrix[i][j] === 3) {
                    mazeMatrix[i][j] = 0;
                }
            }
        }

        setMazeMatrix(Array.from(mazeMatrix));
    }

    const solve = () => {
        if (redPoint !== 2) {
            return;
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mazeMatrix)
        };
        fetch('http://127.0.0.1:5000/api/solve', requestOptions)
            .then(response => response.json())
            .then(data => setMazeMatrix(data));
    }

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

    const drawMaze = () => {
        return mazeMatrix.map((row, rIndex) => (
            <Grid key={rIndex} container item direction="row">
             {row.map((cell, cIndex) => (
                <Grid onMouseDown ={onTileClick(rIndex, cIndex)} onMouseEnter={onMouseMove(rIndex, cIndex)} id={rIndex + "_" + cIndex} key={rIndex + "_" + cIndex} item><Tile  width={32} height={32} state={cell}></Tile></Grid>
            ))}
            </Grid>
        ))
    }

    return (
        <div>
            <Button onClick={solve} variant="contained" color="primary" >Solve</Button>
            <Button onClick={clearSolution} variant="contained" color="primary" >Claer</Button>
            <Button onClick={reset} variant="contained" color="primary">Reset Maze</Button>
            
            <Grid onMouseDown={e => { e.preventDefault();setMouseIsDown(true)}} onMouseUp={e => setMouseIsDown(false)}   container>
                {drawMaze()}
            </Grid>
            
        </div>
    );
};

export default Maze;