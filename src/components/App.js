import React, {useState} from 'react';
import Maze from './Maze';
import { Button, TextField, Grid, Typography } from '@material-ui/core';
import Tile from './Tile';

function App() {
  const [state, setState] = useState(2);
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);
  const [mazeMatrix, setMazeMatrix] = useState(Array.from(Array(height), () => Array(width).fill(0)));
  const [redPoint, setRedPoint] = useState(0);
 
  const [solved, setSolved] = useState(false);

  const style = {
    width: 60,
  }

  const handleWidthChange = (e) => {
    const val = e.target.value;
    
    setWidth(parseInt(val));
  }

  const handleHeightChange = (e) => {
    const val = e.target.value;
    
    setHeight(parseInt(val));
  }

  

  const reset = () => {
      setRedPoint(0);
      setSolved(false);
      setMazeMatrix(Array.from(Array(height), () => Array(width).fill(0)));
  }

  const clearSolution = () => {
      for (var i = 0; i < mazeMatrix.length; i++) {
          for (var j = 0; j < mazeMatrix[0].length; j++) {
              if (mazeMatrix[i][j] === 3) {
                  mazeMatrix[i][j] = 0;
              }
          }
      }

      setSolved(false);

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
          .then(data => {setMazeMatrix(data); setSolved(true)});
  }
  const canvasStyle = {
      display: "flex",
      flexDirection: "col",
      marginTop: 40
  }

  return (
    
    <div className="App" >
      <Typography variant="h2">
        Maze Solver
      </Typography>
      <div style={canvasStyle}>
        <Button disabled={state===2 || solved} onClick={()=>setState(2)} variant="contained" color="primary">Wall</Button>
        <Button disabled = {state === 1 || solved} onClick={()=>setState(1)} variant="contained" color="secondary">Start/End</Button>
        <Button disabled={state===0 || solved} onClick={()=>setState(0)} variant="contained" color="default">Delete</Button>
        <Tile state={state} width={32} height={32}></Tile>
      </div>
      
      <br />
      
 
      <Grid container spacing={2}>
        <Grid item>
          <TextField type="number" onChange={handleWidthChange} value={width} style={style} id="filled-basic" size="small" label="width" variant="filled" />
        </Grid>
        
        <Grid item>
          <TextField type="number" onChange={handleHeightChange} style={style} id="filled-basic" size="small" value = {height} label="height" variant="filled" />
        </Grid>
      </Grid>      
      <br />

      <Button disabled={solved || redPoint !== 2} onClick={solve} variant="contained" color="primary" >Solve</Button>
      <Button disabled={!solved} onClick={clearSolution} variant="contained" color="primary" >Claer</Button>
      <Button onClick={reset} variant="contained" color="primary">Reset Maze</Button>
      <Maze state={state} mazeMatrix={mazeMatrix} redPoint={redPoint} setRedPoint={setRedPoint} setMazeMatrix={setMazeMatrix}></Maze>
      

    </div>
  );
}

export default App;
