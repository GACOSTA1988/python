import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import SnakeSegment from './SnakeSegment';
import Snack from './Snack';
import SnakeBrain from '../SnakeBrain';

const squareSize = 25;
const game = new SnakeBrain(squareSize);

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(${squareSize}, 1fr);
    grid-template-rows: repeat(${squareSize}, 1fr);
    grid-gap: 0px;
    width: 80vh;
    height: 80vh;
    background-color: white;
    margin: 0 auto;
    border: 5px solid gray;
`;

let snek = game.getSnake();
export default function Game() {
    const [snake, setSnake] = useState(snek);
    const [direction, setDirection] = useState('s');
    const [munchy, setMunchy] = useState(game.getMunchy(snek));

    function handleKeyPress(e) {
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            if (
                !(
                    ['w', 's'].includes(e.key) && ['w', 's'].includes(direction)
                ) &&
                !(['a', 'd'].includes(e.key) && ['a', 'd'].includes(direction))
            ) {
                setDirection(e.key);
            }
        }
    }
    useEffect(() => {
        document.body.addEventListener('keypress', handleKeyPress);
        return () =>
            document.body.removeEventListener('keypress', handleKeyPress);
    }, [direction]);

    useEffect(() => {
        console.log(`X: ${munchy[0]} ${snake[0][0]}`);
        console.log(`Y: ${munchy[1]} ${snake[0][1]}`);
        const timer = setInterval(() => {
            const movedSnake = game.moveSnake(snake, direction, munchy);
            setSnake(movedSnake);
            if (movedSnake.length > snake.length) {
                setMunchy(game.getMunchy(movedSnake));
            }
        }, 200 * (3 / snake.length));
        return () => clearInterval(timer);
    });

    return (
        <Grid>
            {snake.map((body, i) => {
                return <SnakeSegment row={body[0]} column={body[1]} key={i} />;
            })}
            <Snack row={munchy[0]} column={munchy[1]} />
        </Grid>
    );
}
