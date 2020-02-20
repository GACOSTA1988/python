export default class SnakeBrain {
    constructor(boardSize) {
        this.boardSize = boardSize;
        this.center = Math.floor(boardSize / 2);
    }

    getSnake() {
        return Array(3).fill([this.center, this.center]);
    }

    moveSnake(snake, keypress, munchy) {
        let moveDir = [0, 0];
        switch (keypress) {
            case 'w':
                moveDir = [-1, 0];
                break;
            case 'a':
                moveDir = [0, -1];
                break;
            case 's':
                moveDir = [1, 0];
                break;
            case 'd':
                moveDir = [0, 1];
                break;
        }
        const newHead = [snake[0][0] + moveDir[0], snake[0][1] + moveDir[1]];

        for (let i = 0; i < snake.length; i++) {
            if (snake[i][0] === newHead[0] && snake[i][1] === newHead[1]) {
                return false;
            }
        }
        if (newHead.includes(0) || newHead.includes(this.boardSize + 1)) {
            return false;
        }

        const shouldGrow = munchy[0] === newHead[0] && munchy[1] === newHead[1];

        const newSnake = [newHead, ...snake];
        if (!shouldGrow) newSnake.pop();
        return newSnake;
    }

    getMunchy(snake) {
        let vibeCheck = false;
        const spot = [0, 0];
        while (!vibeCheck) {
            spot[0] = this.randSpot();
            spot[1] = this.randSpot();
            for (let i = 0; i < snake.length; i++) {
                if (snake[i][0] !== spot[0] && snake[i][1] !== spot[1]) {
                    vibeCheck = true;
                }
            }
        }
        return spot;
    }

    randSpot() {
        return Math.floor(Math.random() * this.boardSize) + 1;
    }
}
