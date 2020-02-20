import React from 'react';

export default function SnakeSegment(props) {
    return (
        <div
            style={{
                gridRow: props.row,
                gridColumn: props.column,
                backgroundColor: props.color,
                borderRadius: '50%',
            }}
        ></div>
    );
}
