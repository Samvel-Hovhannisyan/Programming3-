class Grass {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.index = index;
        this.multiply = 0;
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
        ];
    }
    chooseCell(character) {
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0));
        if (this.multiply >= 5 && newCell) {
            var newGrass = new Grass(newCell[0], newCell[1], this.index);
            grassArr.push(newGrass);
            matrix[newCell[1]][newCell[0]] = 1;
            this.multiply = 0;
        }
    }
}

class GrassEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 8;
        this.index = index;
        this.m = 0;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
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
    die() {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in grassEaterArr) {
            if (this.x == grassEaterArr[i].x && this.y == grassEaterArr[i].y) {
                grassEaterArr.splice(i, 1);
            }
        }
    }
    eat() {
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
                this.mul()
                this.multiply = 0;
            }
            if (this.energy < 5) {
                this.die();
            }
        }
        else {
            this.move();
            this.energy--;

        }
    }
    mul() {
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

class xotakerEater {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.energy = 150;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(character1, character2) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character1 || matrix[y][x] == character2) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }
    move() {
        var fundCords = this.chooseCell(0, 1);
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
            matrix[y][x] = 3;


            this.x = x;
            this.y = y;
        }
        if (this.energy < 1) {
            this.die();
        }
    }

    die() {
        this.getNewCoordinates();
        matrix[this.y][this.x] = 0;

        for (var i in xotakerEaterArr) {
            if (this.x == xotakerEaterArr[i].x && this.y == xotakerEaterArr[i].y) {
                xotakerEaterArr.splice(i, 1);
            }
        }
    }

    eat() {
        var fundCords = this.chooseCell(2);
        var cord = random(fundCords);

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
                this.mul()
                this.multiply = 0;
            }
        }
        else {
            this.move();
            this.energy--;
            if (this.energy < 1) {
                this.die();
            }
        }
    }
    mul() {
        var emptyCells = this.chooseCell(1);
        var newCell = random(emptyCells);
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = this.index;
            var Newxotakereat = new xotakerEater(newX, newY, this.index);
            xotakerEaterArr.push(Newxotakereat);
        }
    }
}

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

class Cool {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.energy = 6;
        this.hincel = 0;
        this.index = index;
    }
    getNewCoordinates() {
        this.direction = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],

        ];
    }

    chooseCell(character) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.direction) {
            var x = this.direction[i][0];
            var y = this.direction[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == character) {
                    found.push(this.direction[i]);
                }
            }
        }
        return found;
    }

    eat() {
        var emptyCellsx = this.chooseCell(3);
        var a = [];
        for (var i = 0; i < emptyCellsx.length; i++) {
            a.push(emptyCellsx[i]);
        }
        var newCellxy = random(a);
        if (newCellxy) {
            this.energy += 8;
            var newX = newCellxy[0];
            var newY = newCellxy[1];
            matrix[newY][newX] = 0
            for (var i in xotakerEaterArr) {
                if (newX == xotakerEaterArr[i].x && newY == xotakerEaterArr[i].y) {
                    xotakerEaterArr.splice(i, 1);
                    break;
                }
            }
        }
    }
}