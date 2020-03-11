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