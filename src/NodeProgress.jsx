import React from "react";
import "../styles/progress.css";

export const NodeProgress = ({ name, total, currentPosition }) => {
    const getIsCurrentPosition = (name, index) => {
        if (name === 'operation') return index === currentPosition;
        if (name === 'step') return index + 1 === currentPosition;
    }
    return (
        <div className="progress">
            {Array.from(Array(total).keys()).map(index => <div className={`node ${name} ${getIsCurrentPosition(name, index) ? 'current' : ''} `} key={name+'-'+index+1}>{index+1}</div>)}
        </div>
    )
}
