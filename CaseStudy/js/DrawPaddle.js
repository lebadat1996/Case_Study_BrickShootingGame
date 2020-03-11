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
let paddle = new Paddle(0, Canvas.clientHeight - 20, 100, 20);
document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        paddle.x -= paddle.speed;
    } else if (event.keyCode === 39) {
        paddle.x += paddle.speed;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > Canvas.clientWidth - paddle.width) {
        paddle.x = Canvas.clientWidth - paddle.width;
    }
});