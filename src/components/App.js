import React, {useState} from 'react';
import Maze from './Maze';
import { Button, TextField, Grid } from '@material-ui/core';

function App() {
  const [state, setState] = useState(2);
  const [width, setWidth] = useState(8);
  const [height, setHeight] = useState(8);

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

  return (
    <div className="App">
      
      <Button onClick={()=>setState(2)} variant="contained" color="primary">Wall</Button>
      <Button onClick={()=>setState(1)} variant="contained" color="secondary">Start/End</Button>
      <Button onClick={()=>setState(0)} variant="contained" color="primary">Delete</Button>
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
      
      <Maze state={state} width={width} height={height}></Maze>
      

    </div>
  );
}

export default App;
