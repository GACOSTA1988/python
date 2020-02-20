import React, { useState, useEffect } from 'react';
import SnakeSegment from './SnakeSegment';

import Snake from '../Snake';

const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(11, 1fr)',
    gridTemplateRows: 'repeat(11, 1fr)',
    gridGap: '10px',
    width: '80vh',
    height: '80vh',
    backgroundColor: 'white',
    margin: '0 auto',
    marginTop: '80px',
    border: '5px solid gray',
};
export default function Game() {
    let [snake, setSnake] = useState(new Snake(11));
    let [direction, setDirection] = useState('DOWN');

    function handleKeyPress(e) {
        setDirection(interpretKeypress(e.key));
        setTimeout(() => {
            console.log(direction);
        }, 10);
    }
    let cleaner;
    if (cleaner) {
        document.body.removeEventListener('keypress', cleaner);
    }
    cleaner = document.body.addEventListener('keypress', e =>
        handleKeyPress(e)
    );
    // useEffect(() => {
    //     console.log('in effect');
    //     const cleaner = document.body.addEventListener('keypress', e =>
    //         handleKeyPress(e)
    //     );
    //     // document.body.removeEventListener('keypress', cleaner);
    //     return function cleanUpKeypress() {
    //         // document.body.removeEventListener('keypress', cleaner);
    //     };
    // }, []);
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setSnake(snake.move(direction));
    //         // console.log(snake.head);
    //     }, 1000);
    //     return function cleanupTimer() {
    //         clearInterval(timer);
    //     };
    // });

    return (
        <div style={gridStyle}>
            <h1>{direction}</h1>
            <SnakeSegment row={snake.head[0]} column={snake.head[1]} />
        </div>
    );
}

function interpretKeypress(e) {
    switch (e) {
        case 'w':
            return 'UP';
        case 'a':
            return 'LEFT';
        case 's':
            return 'DOWN';
        case 'd':
            return 'RIGHT';
    }
}
