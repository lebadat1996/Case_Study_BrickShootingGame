let Canvas = document.getElementById("canvas");
let context = Canvas.getContext('2d');
let isGameOver = false;
let isGameWin = false;

let Ball = function (x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.drawBall = function () {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
    };
    this.updateBallPosition = function () {
        this.x += this.dx;
        this.y += this.dy;
    };
    this.HandlingCollisions = function () {
        if (this.x < this.radius || this.x > canvas.clientWidth - this.radius) {
            this.dx = -this.dx;
        }
        if ((this.y < this.radius)) {
            this.dy = -this.dy;
        }
    };
    this.checkBallWidthBorder = function () {
        if (this.y > canvas.clientHeight - this.radius) {
            isGameOver = true;
        }
    };
    this.checkBallWidthPaddle = function () {
        if (this.x + this.radius >= paddle.x
            && this.x + this.radius <= paddle.x + paddle.width
            && this.y + this.radius >= canvas.clientHeight - paddle.height) {
            this.dy = -this.dy;
        }
    };
    this.checkBallWidthBrick = function () {
        BrickList.forEach(function (b) {
            if (!b.isBroken) {
                if (ball.x >= b.x && ball.x <= b.x + brick.width &&
                    ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + brick.height) {
                    ball.dy = -ball.dy;
                    b.isBroken = true;
                    UserScore += 1;
                    document.getElementById("score").innerHTML = "Score: " + UserScore;
                    if (UserScore === MaxScore) {
                        isGameOver = true;
                        isGameWin = true;
                    }

                }
            }
        })
    }
};
let ball = new Ball(30, canvas.clientHeight - 40, 2, 2, 10);

let Paddle = function (x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = 35;
    this.DrawPaddle = function () {
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        context.fillStyle = 'darkgreen';
        context.fill();
        context.closePath();
    }
};
let paddle = new Paddle(0, canvas.clientHeight - 20, 100, 20);
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        paddle.x -= paddle.speed;
    } else if (event.keyCode === 39) {
        paddle.x += paddle.speed;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.clientWidth - paddle.width) {
        paddle.x = canvas.clientWidth - paddle.width;
    }
});

let Brick = function () {
    this.offsetX = 25;
    this.offsetY = 25;
    this.margin = 25;
    this.width = 70;
    this.height = 25;
    this.totalRow = 3;
    this.totalCol = 5;
    BrickList = [];
    for (let i = 0; i < this.totalRow; i++) {
        for (let j = 0; j < this.totalCol; j++) {
            BrickList.push({
                x: this.offsetX + j * (this.width + this.margin),
                y: this.offsetY + i * (this.height + this.margin),
                isBroken: false
            })
        }
    }
    this.DrawBrick = function () {
        BrickList.forEach(function (b) {
            if (!b.isBroken) {
                context.beginPath();
                context.rect(b.x, b.y, brick.width, brick.height);
                context.fillStyle = 'brown';
                context.fill();
                context.closePath();
            }
        })
    }
};
let brick = new Brick();
let UserScore = 0;
let MaxScore = brick.totalRow * brick.totalCol;
function draw() {
    if (!isGameOver) {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ball.drawBall();
        paddle.DrawPaddle();
        brick.DrawBrick();
        ball.updateBallPosition();
        ball.HandlingCollisions();
        ball.checkBallWidthPaddle();
        ball.checkBallWidthBorder();
        ball.checkBallWidthBrick();
        requestAnimationFrame(draw);
    } else {
        if (isGameWin) {
           document.getElementById("WinOrLose").innerHTML= "YOU WIN";
        } else {
            document.getElementById("WinOrLose").innerHTML= "YOU LOSE";
        }
    }
}
function restart(){
    document.location.reload();
}