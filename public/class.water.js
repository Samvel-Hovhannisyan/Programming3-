class water {
    constructor(x, y, index) {
        this.x = x;
        this.y = y;
        this.multiply = 0;
        this.index = index;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y],
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
    //this.x - 39, this.y;
    mul() {
        this.multiply++;
        var newCell = random(this.chooseCell(0, 1, 2, 3));
        if (this.multiply >= 1 && newCell) {
            var NewWater = new water(newCell[0], newCell[1], this.index);
            waterArr.push(NewWater);
            matrix[newCell[1]][newCell[0]] = 6;
            this.multiply = 0;
        }
    }
}