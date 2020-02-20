import React from 'react';

export default function SnakeSegment(props) {
    return <div style={styleMaker(props.row, props.column)}></div>;
}

function styleMaker(row, column) {
    return { gridRow: row, gridColumn: column, backgroundColor: 'black' };
}
