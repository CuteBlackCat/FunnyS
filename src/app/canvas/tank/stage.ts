import { Num } from './num';
import { Constant } from './constant';
import { GV } from './main';

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

	init(level) {
		this.dir = 1;
		this.isReady = false;
		this.level = level;
		this.temp = 0;
	}

	draw() {
		if (this.dir === 1) {
			if (this.temp === 225) {
				this.ctx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS['stageLevel'][0], Constant.POS['stageLevel'][1], 78, 14, 194, 208, 78, 14);
				this.levelNum.draw(this.level, 308, 208);

				GV.initMap();
			}else if (this.temp === 225 + 600) {
				this.temp = 225;
				this.dir = -1;
				Constant.START_AUDIO.play();
			}else {
				this.ctx.fillRect(0, this.temp, 512, this.drawHeight);
				this.ctx.fillRect(0, 408 - this.temp - this.drawHeight, 512, this.drawHeight);
			}
		}else {
			if (this.temp >= 0) {
				this.ctx.clearRect(0, this.temp, 512, this.drawHeight);
			}else {
				this.isReady = true;
			}
		}

		this.temp += this.drawHeight * this.dir;
	}
}
