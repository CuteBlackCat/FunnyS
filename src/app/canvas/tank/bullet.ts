/**
 * 子弹
 */
export class Bullet {
	ctx: CanvasRenderingContext2D;
	tank: any;
	type: number;
	dir: number;
	size: number;
	x: number;
	y: number;

	constructor(ctx, tank, type, dir) {
		this.ctx = ctx;
		this.type = type;
		this.tank = tank;
		this.dir = dir;
		this.size = 0;
	}

	draw() {

	}
}

