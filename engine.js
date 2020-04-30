
//set up canvas
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");


//set up ball size speed and color
var ballRadius = 10;
var dx = 2;
var dy = -1;
var ballx = canvas.width/2;
var bally = canvas.height-30;

//set up arc coordinates
var arcX = ballx;
var arcy = bally;
var arcRadius = 15;
var t = 360;

//set up paddle size and center it
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//set up user input
var rightPressed = false;
var leftPressed = false;

//check for user input
document.addEventListener("keydown",keyDownHandler, false);
document.addEventListener("keyup",keyUpHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = true;
    }
    
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight"){
        rightPressed = false;
    }
    
    else if(e.key == "Left" || e.key == "ArrowLeft"){
        leftPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ballx,bally,ballRadius,0,Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath(); 

}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawArcTimer() {
        if (t > 0){
        ctx.beginPath();
        let x = ballx;
        let y = bally;
        let radius = arcRadius;
        let startAngle = 0;
        let endAngle = Math.PI*.00555*t; //.0333PI = 6 degrees * 60 = 360
        ctx.arc (x, y, radius, startAngle, endAngle);
        ctx.lineWidth = 4;
        ctx.stroke();
    }
}

//main draw loop, this is what is called repeatedly
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();
    drawBall();
    drawArcTimer();
    ballx += dx;
    bally += dy;
    

    
    if(bally + dy < ballRadius) {
        dy = -dy;
    }
    else if (bally + dy > canvas.height-ballRadius) {
        if(ballx > paddleX && ballx < paddleX + paddleWidth){
            dy = -dy;
        }
        else {
            alert('could have been someone');
            document.location.reload();
            clearInterval(interval);
        }
        
    }

    if(ballx + dx > canvas.width-ballRadius || ballx + dx < ballRadius) {
        dx = -dx;
    }

    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    t--;
}

var interval = setInterval(draw, 10);

