export default class GalaxyBrain {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.center = Math.floor(boardSize / 2);
    }

    getSnakes() {
        return [
            Array(3).fill([this.center - 5, this.center - 5]),
            Array(3).fill([this.center + 5, this.center + 5]),
        ];
    }

    moveSnakes(snakes, directions, munchy) {
        //next position logic
        let [move1, move2] = [[0, 0], [0, 0]];
        switch (directions[0]) {
            case 'w':
                move1 = [-1, 0];
                break;
            case 'a':
                move1 = [0, -1];
                break;
            case 's':
                move1 = [1, 0];
                break;
            case 'd':
                move1 = [0, 1];
                break;
        }
        switch (directions[1]) {
            case 'i':
                move2 = [-1, 0];
                break;
            case 'j':
                move2 = [0, -1];
                break;
            case 'k':
                move2 = [1, 0];
                break;
            case 'l':
                move2 = [0, 1];
                break;
        }
        const newHead1 = [
            snakes[0][0][0] + move1[0],
            snakes[0][0][1] + move1[1],
        ];
        const newHead2 = [
            snakes[1][0][0] + move2[0],
            snakes[1][0][1] + move2[1],
        ];

        //game loss logic
        if (newHead1[0] === newHead2[0] && newHead1[1] === newHead2[1]) {
            return [false, false];
        }
        for (let i = 0; i < snakes[0].length; i++) {
            if (
                snakes[0][i][0] === newHead2[0] &&
                snakes[0][i][1] === newHead2[1]
            ) {
                return [snakes[0], false];
            }
        }
        for (let i = 0; i < snakes[1].length; i++) {
            if (
                snakes[1][i][0] === newHead1[0] &&
                snakes[1][i][1] === newHead1[1]
            ) {
                return [false, snakes[1]];
            }
        }
        if (newHead1.includes(0) || newHead1.includes(this.boardSize + 1)) {
            return [false, snakes[1]];
        }
        if (newHead2.includes(0) || newHead2.includes(this.boardSize + 1)) {
            return [false, snakes[1]];
        }

        //normal case logic
        const shouldGrow1 =
            munchy[0] === newHead1[0] && munchy[1] === newHead1[1];
        const shouldGrow2 =
            munchy[0] === newHead2[0] && munchy[1] === newHead2[1];

        const newSnakes = [[newHead1, ...snakes[0]], [newHead2, ...snakes[1]]];
        if (!shouldGrow1) newSnakes[0].pop();
        if (!shouldGrow2) newSnakes[1].pop();
        return newSnakes;
    }

    getMunchy(snakes) {
        let vibeCheck = [false, false];
        const spot = [0, 0];
        while (!(vibeCheck[0] && vibeCheck[1])) {
            spot[0] = this.randSpot();
            spot[1] = this.randSpot();
            for (let i = 0; i < snakes[0].length; i++) {
                if (
                    snakes[0][i][0] !== spot[0] &&
                    snakes[0][i][1] !== spot[1]
                ) {
                    vibeCheck[0] = true;
                }
            }
            for (let i = 0; i < snakes[1].length; i++) {
                if (
                    snakes[1][i][0] !== spot[0] &&
                    snakes[1][i][1] !== spot[1]
                ) {
                    vibeCheck[1] = true;
                }
            }
        }
        return spot;
    }

    randSpot() {
        return Math.floor(Math.random() * this.boardSize) + 1;
    }
}
