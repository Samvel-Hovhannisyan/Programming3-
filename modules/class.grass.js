var Parent = require("./class.parent.js");
module.exports = class Grass extends Parent {

    constructor(x, y, index, matrix){
        super(x, y, index, matrix);
    }
    
    mul(grassArr) {
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