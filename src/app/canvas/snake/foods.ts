export class Food {
	public x: number;
	public y: number;
	private color: string;
	private weight: number;

	constructor(x: number, y: number, color: string, weight: number) {
		this.x = x;
		this.y = y;
		this.color = color;
		this.weight = weight;
	}

	drawFood(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.weight, 0, 360);
		ctx.closePath();
		ctx.fillStyle = this.color;
		ctx.fill();
	}


}
