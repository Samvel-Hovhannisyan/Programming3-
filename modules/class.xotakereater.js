var Parent = require("./class.parent.js");
module.exports = class XotakerEater extends Parent {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 150;
    }
    chooseCell(character, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(character, matrix);
    }
    move(xotakerEaterArr, matrix) {
        var fundCords = this.chooseCell(0, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = 1;
            }
            matrix[y][x] = 3;


            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die(xotakerEaterArr, matrix);
        }
    }

    die(xotakerEaterArr, matrix) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in xotakerEaterArr) {
            if (this.x == xotakerEaterArr[i].x && this.y == xotakerEaterArr[i].y) {
                xotakerEaterArr.splice(i, 1);
            }
        }
    }

    eat(xotakerEaterArr, grassEaterArr, matrix) {
        var fundCords = this.chooseCell(2, matrix);
        var cord = this.random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 3;
            matrix[this.y][this.x] = 0;

            for (var i in grassEaterArr) {
                if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                    grassEaterArr.splice(i, 1);
                }
            }
            this.x = x;
            this.y = y;

            this.multiply++;
            this.energy++;

            if (this.multiply == 10) {
                this.mul(xotakerEaterArr, matrix)
                this.multiply = 0;
            }
        }
        else {
            this.move(xotakerEaterArr, matrix);
            this.energy--;
            if (this.energy < 1) {
                this.die(xotakerEaterArr, matrix);
            }
        }
    }
    mul(xotakerEaterArr, matrix) {
        var emptyCells = this.chooseCell(1, matrix);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var Newxotakereat = new XotakerEater(newX, newY, this.index);
            xotakerEaterArr.push(Newxotakereat);
        }
    }
}
