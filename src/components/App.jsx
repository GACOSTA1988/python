import React from 'react';
import Game from './Singles/Game';
import DoublesGame from './Doubles/DoublesGame';

import styled from 'styled-components/macro';
const Screen = styled.div`
    background-color: black;
    padding: 10vh;
`;

export default function App() {
    return (
        <Screen>
            <DoublesGame />
        </Screen>
    );
}
// <Game />;
