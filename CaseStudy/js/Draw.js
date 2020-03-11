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
            document.getElementById("WinOrLose").innerHTML = "YOU WIN";
        } else {
            document.getElementById("WinOrLose").innerHTML = "YOU LOSE";
        }
    }
}

function restart() {
    document.location.reload();
}