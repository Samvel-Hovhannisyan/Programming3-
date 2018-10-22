class tornado {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 2, this.y],
            [this.x + 2, this.y]
        ];
    }

    chooseCell(character1, character2, character3, character4) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2 || matrix[y][x] == character3 || matrix[y][x] == character4) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var fundCords = this.chooseCell(0, 1, 2, 3);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];
            if (matrix[y][x] == 0) {
                matrix[this.y][this.x] = 0;
            }
            else if (matrix[y][x] == 1) {
                matrix[this.y][this.x] = 1;
            }
            else if (matrix[y][x] == 2) {
                matrix[this.y][this.x] = 2;
            }
            else if (matrix[y][x] == 3) {
                matrix[this.y][this.x] = 3;
            }

            matrix[y][x] = 5;


            this.x = x;
            this.y = y;
        }
    }

    eat() {
        var fundCords = this.chooseCell(1, 2, 3);
        var cord = random(fundCords);

        if (cord) {
            var x = cord[0];
            var y = cord[1];

            if (matrix[y][x] == 1) {
                for (var i in grassArr) {
                    if (x == grassArr[i].x && y == grassArr[i].y) {
                        grassArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[y][x] == 2) {
                for (var i in grassEaterArr) {
                    if (x == grassEaterArr[i].x && y == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                    }
                }
            }
            else if (matrix[y][x] == 3) {
                for (var i in xotakerEaterArr) {
                    if (x == xotakerEaterArr[i].x && y == xotakerEaterArr[i].y) {
                        xotakerEaterArr.splice(i, 1);
                    }
                }
            }

            matrix[y][x] = 5;
            matrix[this.y][this.x] = 0;

            this.x = x;
            this.y = y;

            if (this.multiply == 10) {
                this.multiply = 0;
            }
        }
        else {
            this.move();
        }
    }
}
