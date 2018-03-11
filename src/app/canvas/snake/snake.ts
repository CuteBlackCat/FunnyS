export class snake {
    private color: [string];
    private name: string;
    private length: number;
    private weight: number;
    private x: number;
    private y: number;
    private angle: number;


    constructor(name: string, color: [string], length: number, weight: number, x: number, y: number ) {
        this.color = color;
        this.name = name;
        this.length = length;
        this.weight = weight > 5 ? weight : 5;
        this.x = x;
        this.y = y;
        //snake移动的方向
        this.angle = Math.random() * 360;
    }

    drawSnake(ctx) {
        for (let i = 0; i < this.length; i++) {
            const colorI = i % this.color.length;
            ctx.baginPath();
            ctx.arc(this.x, this.y, this.weight, 0, 360);
            ctx.closePath();
            ctx.fillStyle = this.color[colorI];
            ctx.fill();
            //snake头
            if(i === 0) {
                ctx.beginPath();
                const move = 
            }
        }
    }
}