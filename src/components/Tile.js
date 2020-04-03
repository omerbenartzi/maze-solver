import React from 'react';

const Tile = (props) => {
    const style = {
        width: props.width,
        height: props.height,
        borderStyle: "solid"
    };

    switch (props.state) {
        case 2:
            style.backgroundColor = "black";
            break;
        case 1:
            style.backgroundColor = "red";
            break;
        case 3:
            style.backgroundColor = "blue";
            break;
        default:
            style.backgroundColor = "white"
    }

    return (
        <div style={style}>
     
        </div>
    );
};

export default Tile;