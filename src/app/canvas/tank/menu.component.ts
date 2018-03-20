import { Constant } from './constant.component';

export class Menu {

	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	selectTank: Selectank;
	playerNum: number;
	times: number;

	constructor(ctx: CanvasRenderingContext2D) {

		this.ctx = ctx;
		this.x = 0;
		this.y = Constant.SCREEN_HEIGHT;
		this.selectTank = new this.selectTank();
		this.playerNum = 1;
		this.times = 0;
	}

	/**
	 * 画菜单
	 */
	draw() {
		this.times ++;
		let temp = 0;
		if (Math.trunc(this.times / 6) % 2 === 0) {
			temp = 0;
		}else {
			temp = this.selectTank.size;
		}
		this.y = this.y > 0 ? this.y -= 5 : 0;

		this.ctx.clearRect(0, 0, Constant.SCREEN_WIDTH, Constant.SCREEN_HEIGHT);
		this.ctx.save();

		Constant.MENU_IMAGE.src = 'images/menu.gif';
		this.ctx.drawImage(Constant.MENU_IMAGE, this.x, this.y);

		Constant.RESOURCE_IMAGE.src = 'images/tankAll.gif';
		this.ctx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS.selectTank[0], Constant.POS.selectTank[0], this.selectTank.size, this.selectTank.size, this.selectTank.x, this.y + this.selectTank.ys[this.playerNum - 1], this.selectTank.size, this.selectTank.size);
		this.ctx.restore();
	}

	/**
	 * 选择玩家人数
	 */
	next(n) {
		this.playerNum += n;
		this.playerNum = this.playerNum > 2 ? 1 : this.playerNum < 1 ? 2 : this.playerNum;
	}

}
