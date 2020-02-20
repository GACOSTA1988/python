export default class Snake {
    constructor(gridSize) {
        this.length = 5;

        const start = Math.floor(gridSize / 2);
        this.body = Array(5).fill([start, start]);
        this.head = [6, 6];
    }

    move(direction) {
        let moveTo = [0, 0];
        switch (direction) {
            case 'UP':
                moveTo = [-1, 0];
                break;
            case 'LEFT':
                moveTo = [0, -1];
                break;
            case 'RIGHT':
                moveTo = [0, 1];
                break;
            case 'DOWN':
                moveTo = [1, 0];
                break;
        }
        // const newHead = [
        //     this.body[0][0] + moveTo[0],
        //     this.body[0][1] + moveTo[1],
        // ];
        const newHead = [this.head[0] + moveTo[0], this.head[1] + moveTo[1]];
        this.head = newHead;
        return this;
    }
}
