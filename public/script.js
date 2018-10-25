var matrix;
var socket;
var side = 10;

function setup() {

    frameRate(10);
    socket = io.connect();

    socket.on("receive matrix", function (mtx) {
        matrix = mtx;
        console.log(matrix);
        createCanvas(matrix[0].length * side, matrix.length * side);
        noLoop();

        socket.on("redraw", function (mtx) {
            matrix = mtx;
            redraw();
        });
    });
    background('#acacac');
}

function draw() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill(0, 255, 0);
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill('#4A3820');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill('yellow');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill('white');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill('red');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 5) {
                fill('gray');
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 6) {
                fill('#42c5f4');
                rect(x * side, y * side, side, side);
            }
        }
    }
}