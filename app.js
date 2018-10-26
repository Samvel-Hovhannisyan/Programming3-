var express = require('express');
var path = require('path');
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

////////////////////////////////////////////////////////

var Grass = require("./modules/class.grass.js");
var GrassEater = require("./modules/class.grasseater.js");
var XotakerEater = require("./modules/class.xotakereater.js");
var Cool = require("./modules/class.cool.js");
var Tornado = require("./modules/class.tornado.js");
var Water = require("./modules/class.water.js");

////////////////////////////////////////////////////////

var grassArr = [];
var grassEaterArr = [];
var xotakerEaterArr = [];
var coolArr = [];
var tornadoArr = [];
var waterArr = [];

////////////////////////////////////////////////////////

var matrix = require('./modules/matrix.js')();

////////////////////////////////////////////////////////

var n = matrix.length;

////////////////////////////////////////////////////////

for (var y = 0; y < matrix.length; y++) {
  for (var x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] == 1) {
      grassArr.push(new Grass(x, y, 1, matrix));
    }
    else if (matrix[y][x] == 2) {
      grassEaterArr.push(new GrassEater(x, y, 2, matrix));
    }
    else if (matrix[y][x] == 3) {
      xotakerEaterArr.push(new XotakerEater(x, y, 3, matrix));
    }
    else if (matrix[y][x] == 4) {
      coolArr.push(new Cool(x, y, 4, matrix));
    }
    else if (matrix[y][x] == 5) {
      tornadoArr.push(new Tornado(x, y, 5, matrix));
    }
    else if (matrix[y][x] == 6) {
      waterArr.push(new Water(x, y, 6, matrix));
    }
  }
}

////////////////////////////////////////////////////////

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.redirect('index.html');
});

server.listen(3000);

var frameRate = 5;
var drawTime = 1000 / frameRate;

/////////////////////////////////////////////////////////



io.on("connection", function (socket) {
  socket.emit("get matrix", matrix);
  // console.log(matrix + "")

  var Interval = setInterval(function () {
    for (var i in grassArr) {
      grassArr[i].mul(grassArr, matrix);
    }
    for (var i in grassEaterArr) {
      grassEaterArr[i].eat(grassEaterArr, grassArr, matrix);
    }
    for (var i in xotakerEaterArr) {
      xotakerEaterArr[i].eat(xotakerEaterArr, grassEaterArr, matrix);
    }
    for (var i in coolArr) {
      coolArr[i].eat(xotakerEaterArr, matrix);
    }
    for (var i in tornadoArr) {
      tornadoArr[i].eat(tornadoArr, grassArr, grassEaterArr, xotakerEaterArr, matrix);
    }
    for (var i in waterArr) {
      waterArr[i].mul(waterArr, matrix);
      if (waterArr.length >= n) {
        waterArr[i].die(waterArr, matrix);
        break;
      }
    }
  socket.emit("redraw", matrix)
  }, drawTime)

})