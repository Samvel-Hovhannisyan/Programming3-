var Parent = require("./class.parent.js");
module.exports = class GrassEater extends Parent{
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 8;
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(grassEaterArr, matrix) {
        var fundCords = this.chooseCell(0, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1] ;

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.energy--;
            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die(grassEaterArr, matrix);
        }
    }
    die(grassEaterArr, matrix) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
    eat(grassEaterArr, grassArr, matrix) {
        var fundCords = this.chooseCell(1, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;

            for (var i in grassArr) {
                if (x == grassArr[i].x && y == grassArr[i].y) {
                    grassArr.splice(i, 1);
                }
            }
            this.x = x;
            this.y = y;

            this.multiply++;

            this.energy++;

            if (this.multiply == 7) {
                this.mul(grassEaterArr, matrix)
                this.multiply = 0;
            }
            if (this.energy < 5) {
                this.die(grassEaterArr, matrix);
            }
        }
        else {
            this.move(grassEaterArr, matrix);
            this.energy--;

        }
    }
    mul(grassEaterArr, matrix) {
        var emptyCells = this.chooseCell(1, matrix);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var NewGrasseat = new GrassEater(newX, newY, this.index);
            grassEaterArr.push(NewGrasseat);
        }
    }
}
