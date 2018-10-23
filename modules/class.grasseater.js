module.exports = class GrassEater extends parent{
    constructor(x, y, index) {
        this.energy = 8;
        this.m = 0;
        super(x, y, index);
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character);
    }
    move() {
        var fundCords = this.chooseCell(0);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            matrix[y][x] = 2;
            matrix[this.y][this.x] = 0;
            this.energy--;
            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die();
        }
    }
    die(grassEaterArr) {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
    eat(grassEaterArr, grassArr) {
        var fundCords = this.chooseCell(1);
        var cord = random(fundCords);

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
            this.m++;

            this.energy++;

            if (this.multiply == 7) {
                this.mul(grassEaterArr)
                this.multiply = 0;
            }
            if (this.energy < 5) {
                this.die(grassEaterArr);
            }
        }
        else {
            this.move(grassEaterArr);
            this.energy--;

        }
    }
    mul(grassEaterArr) {
        var emptyCells = this.chooseCell(1);
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
