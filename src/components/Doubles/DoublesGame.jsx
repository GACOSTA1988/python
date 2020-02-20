import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import SnakeSegment from '../SnakeSegment';
import Snack from '../Snack';

import GalaxyBrain from '../../GalaxyBrain';

const squareSize = 25;
const game = new GalaxyBrain(squareSize);

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

let sneks = game.getSnakes();
console.error(sneks);
export default function DoublesGame() {
    const [snake1, setSnake1] = useState(sneks[0]);
    const [direction1, setDirection1] = useState('d');

    const [snake2, setSnake2] = useState(sneks[1]);
    const [direction2, setDirection2] = useState('j');

    const [munchy, setMunchy] = useState(game.getMunchy(sneks));

    function handleKeyPress(e) {
        console.log(e.key);
        if (['w', 'a', 's', 'd'].includes(e.key)) {
            if (
                !(
                    ['w', 's'].includes(e.key) &&
                    ['w', 's'].includes(direction1)
                ) &&
                !(['a', 'd'].includes(e.key) && ['a', 'd'].includes(direction1))
            ) {
                setDirection1(e.key);
            }
        }
        if (['i', 'j', 'k', 'l'].includes(e.key)) {
            if (
                !(
                    ['i', 'k'].includes(e.key) &&
                    ['i', 'k'].includes(direction2)
                ) &&
                !(['j', 'l'].includes(e.key) && ['j', 'l'].includes(direction2))
            ) {
                setDirection2(e.key);
            }
        }
    }
    useEffect(() => {
        document.body.addEventListener('keypress', handleKeyPress);
        return () =>
            document.body.removeEventListener('keypress', handleKeyPress);
    }, [direction1, direction2]);

    useEffect(() => {
        const timer = setInterval(() => {
            const movedSnakes = game.moveSnakes(
                [snake1, snake2],
                [direction1, direction2],
                munchy
            );
            setSnake1(movedSnakes[0]);
            setSnake2(movedSnakes[1]);
            if (
                movedSnakes[0].length > snake1.length ||
                movedSnakes[1].length > snake2.length
            ) {
                setMunchy(game.getMunchy(movedSnakes));
            }
        }, 50);
        return () => clearInterval(timer);
    });

    return (
        <Grid>
            {snake1.map((body, i) => {
                return (
                    <SnakeSegment
                        row={body[0]}
                        column={body[1]}
                        color="orange"
                        key={i}
                    />
                );
            })}
            {snake2.map((body, i) => {
                return (
                    <SnakeSegment
                        row={body[0]}
                        column={body[1]}
                        color="purple"
                        key={i}
                    />
                );
            })}
            <Snack row={munchy[0]} column={munchy[1]} color="gray" />
        </Grid>
    );
}
