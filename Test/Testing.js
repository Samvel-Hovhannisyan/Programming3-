var express = require('express');
var path = require('path');
var app = express();
var fs = require("fs");

var server = require("http").Server(app);
var io = require("socket.io")(server);

var mat = require("./modules/Matrix.js");
var matrix = mat(100, 100);

var Auto = require("./modules/auto.js");
var Grass = require("./modules/grass.js");
var GrassEater = require("./modules/grasseater.js");
var Human = require("./modules/human.js");
var Predator = require("./modules/predator.js");
var Snail = require("./modules/snail.js");
var Creeper = require("./modules/creeper.js");

var grassArr = [];
var grassLifeArr = [0, 0];

var grassEaterArr = [];
var grassEaterLifeArr = [0, 0];

var predatorArr = [];
var predatorLifeArr = [0, 0];

var humanArr = [];
var humanLifeArr = [0, 0];

var snailArr = [];
var snailLifeArr = [0, 0];

var slimeArr = [];

var autoArr = [];
var autoLifeArr = [0, 0];

var creeperArr = [];

for (y = 0; y < matrix.length; y++) {
    for (x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            var gr = new Grass(x, y, 1);
            grassArr.push(gr);
        }
        else if (matrix[y][x] == 2) {
            var gre = new GrassEater(x, y, 2);
            grassEaterArr.push(gre);
        }
        else if (matrix[y][x] == 3) {
            var pre = new Predator(x, y, 3);
            predatorArr.push(pre);
        }
        else if (matrix[y][x] == 4) {
            var hum = new Human(x, y, 4);
            humanArr.push(hum);
        }
        else if (matrix[y][x] == 5) {
            var sna = new Snail(x, y, 5);
            snailArr.push(sna);
        }
        else if (matrix[y][x] == 7) {
            var auto = new Auto(x, y, 7);
            autoArr.push(auto);
        }
    }
}

grassLifeArr[0]      += grassArr.length;
grassEaterLifeArr[0] += grassEaterArr.length;
predatorLifeArr[0]   += predatorArr.length;
humanLifeArr[0]      += humanArr.length;
snailLifeArr[0]      += snailArr.length;
autoLifeArr[0]       += autoArr.length;

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000);

var frameRate = 5;
var drawTime = 1000 / frameRate;
var FrameCount = 0;

io.on("connection", function (socket) {
    socket.emit("receive matrix", matrix);

    socket.on("click", function (mouseX, mouseY, side) {

        var X = Math.floor(mouseX / side) - 1;
        var Y = Math.floor(mouseY / side) - 1;

        if (matrix[Y][X] == 0) {
            var creeper = new Creeper(X, Y, 9);
            matrix[Y][X] = 9;
            creeperArr.push(creeper);
        }
    });

    genStatistics();

    var Interval = setInterval(function () {

        for (var i in grassArr) {
            grassArr[i].mul(grassArr, matrix, grassLifeArr);
        }
        for (var i in grassEaterArr) {
            grassEaterArr[i].eat(grassEaterArr, grassArr, matrix, grassEaterLifeArr, grassLifeArr);
        }
        for (var i in predatorArr) {
            predatorArr[i].eat(predatorArr, grassArr, grassEaterArr, matrix, predatorLifeArr, grassEaterLifeArr, grassLifeArr);
        }
        for (var i in humanArr) {
            humanArr[i].exterminate(humanArr, grassEaterArr, predatorArr, grassArr, matrix, humanLifeArr, predatorLifeArr, grassEaterLifeArr, grassLifeArr);
        }
        for (var i in snailArr) {
            snailArr[i].move(slimeArr, grassArr, matrix, grassLifeArr);
        }
        for (var i in slimeArr) {
            slimeArr[i].die(slimeArr, matrix);
        }
        for (var i in autoArr) {
            autoArr[i].exterminate(grassEaterArr, grassArr, predatorArr, snailArr, matrix, snailLifeArr, predatorLifeArr, grassEaterLifeArr, grassLifeArr);
        }
        for (var i in creeperArr) {
            creeperArr[i].move(grassArr, grassEaterArr, predatorArr, humanArr, snailArr, slimeArr, autoArr, creeperArr, matrix, autoLifeArr, snailLifeArr, predatorLifeArr, humanLifeArr, grassEaterLifeArr, grassLifeArr);
        }

        socket.emit("redraw", matrix);

        FrameCount++;
        if (FrameCount >= 60) {
            genStatistics();

            FrameCount = 0;
        }

    }, drawTime);

    function genStatistics(){
        var Statistics = {
            "Grass": grassArr.length, "Grass-Alive": grassLifeArr[0], "Grass-Dead": grassLifeArr[1],
            "GrassEater": grassEaterArr.length, "Eater-Alive": grassEaterLifeArr[0], "GrassEater-Dead": grassEaterLifeArr[1],
            "Predator": predatorArr.length, "Predator-Alive": predatorLifeArr[0], "Predator-Dead": predatorLifeArr[1],
            "Human": humanArr.length, "Human-Alive": humanLifeArr[0], "Human-Dead": humanLifeArr[1],
            "Snail": snailArr.length, "Snail-Alive": snailLifeArr[0], "Snail-Dead": snailLifeArr[1],
            "Auto": autoArr.length, "Auto-Alive": autoLifeArr[0], "Auto-Dead": autoLifeArr[1]
        }
        socket.emit("Right Statistics", Statistics);
        main(Statistics);
    }

    function main (stat){
        myJSON = JSON.stringify(stat);
        fs.writeFileSync("Statistics.json", myJSON)
    }

});