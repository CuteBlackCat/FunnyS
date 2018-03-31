import { Constant } from './constant';

export class Num {
	ctx: CanvasRenderingContext2D;
	size: number;

	constructor(ctx) {
		this.ctx = ctx;
		this.size = 14;
	}

	draw(num, x, y) {
		let tempX = x;
		const tempY = y;
		const tempNumArray = [];

		if (num === 0) {
			tempNumArray.push(0);
		}else {
			while (num > 0) {
				tempNumArray.push(num % 10);
				num = Math.trunc(num / 10);
			}
		}

		for (let i = tempNumArray.length - 1; i >= 0; i--) {
			tempX = x + (tempNumArray.length - i - 1) * this.size;
			this.ctx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS['num'][0] + tempNumArray[i] * 14, Constant.POS['num'][1], this.size, this.size, tempX, tempY, this.size, this.size);

		}
	}
}
