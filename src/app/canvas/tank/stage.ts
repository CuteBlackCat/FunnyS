import { Num } from './num';

export class Stage {

	ctx: CanvasRenderingContext2D;
	level: number;
	dir: number; // 中间切换的方向 1：合上； 2： 展开
	isReady: boolean; // 表示地图是否绘制完成
	levelNum: Num;
	temp: number;
	drawHeight: number;

	constructor(ctx, level) {
		this.ctx = ctx;
		this.level = level;
		this.dir = 1;
		this.temp = 0;
		this.isReady = false;
		this.drawHeight = 15;
		this.levelNum = new Num(ctx);

		this.ctx.fillStyle = '#7f7f7f';
	}

	draw() {
		if (this.dir === 1) {
			if (this.temp === 225) {
				
			}
		}
	}
}
