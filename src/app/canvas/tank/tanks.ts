import { Constant } from './constant';
import { GV } from './main';
import { Map } from './map';
import { Bullet } from './bullet';
import { CrackAnimation } from './crackanimation';


class Tank {
	x: number;
	y: number;
	size: number;
	dir: number;
	speed: number;
	frame: number; // 敌方tank切换方向的时间
	hit: boolean; //  是否碰到障碍物
	isAI: boolean; // 是否是自动的
	isShooting: boolean; // 是否正在发射子弹
	bullet: Bullet; // 子弹
	shootRate: number; // 设计概率
	isDestoryed: boolean; // 是否死亡
	tempX: number;
	tempY: number;
	ctx: CanvasRenderingContext2D;
	map: Map;

	constructor(ctx: CanvasRenderingContext2D) {
		this.x = 0;
		this.y = 0;
		this.size = 32;
		this.dir = Constant.UP;
		this.speed = 1;
		this.frame = 0;
		this.hit = false;
		this.isAI = false;
		this.isShooting = false;
		this.bullet = null;
		this.shootRate = 0.6;
		this.isDestoryed = false;
		this.tempX = 0;
		this.tempY = 0;
		this.ctx = ctx;
		// this.map = GV.map;
	}

	move() {
		if (this.isAI && GV.emenyStopTime > 0) {

		}

		this.tempX = this.x;
		this.tempY = this.y;

		if (this.isAI) {
			this.frame++;
			if (this.frame % 100 === 0 || this.hit) {
				this.dir = Math.trunc(Math.random() * 4);
				this.hit = false;
				this.frame = 0;
			}
		}

		switch (this.dir) {
			case Constant.UP:
				this.tempY -= this.speed;
				break;
			case Constant.DOWN:
				this.tempY += this.speed;
				break;
			case Constant.RIGHT:
				this.tempX += this.speed;
				break;
			case Constant.LEFT:
				this.tempX -= this.speed;
		}

		// this.isHit();
		if (!this.hit) {
			this.x = this.tempX;
			this.y = this.tempY;
		}
	}

	// isHit() {
	// 	if (this.dir === Constant.LEFT) {
	// 		if (this.x <= this.map.offsetX) {
	// 			this.x = this.map.offsetX;
	// 			this.hit = true;
	// 		}
	// 	}else if (this.dir === Constant.RIGHT) {
	// 		if (this.x >= this.map.offsetX + this.map.mapWidth - this.size) {
	// 			this.x = this.map.offsetX + this.map.mapWidth - this.size;
	// 			this.hit = true;
	// 		}
	// 	}else if (this.dir === Constant.UP) {
	// 		if (this.y <= this.map.offsetY) {
	// 			this.y = this.map.offsetY;
	// 			this.hit = true;
	// 		}
	// 	}else if (this.dir === Constant.DOWN) {
	// 		if (this.y >= this.map.offsetY + this.map.mapHeight - this.size) {
	// 			this.y = this.map.offsetY + this.map.mapHeight - this.size;
	// 			this.hit = true;
	// 		}
	// 	}

		// if (!this.hit && tankthis.MapCollosion(this, this.map)) {
		// 	this.hit = true;
		// }
	// }

	isShot() {

	}

	shoot(type) {
		if (this.isAI && GV.emenyStopTime > 0) {
			return;
		}
		if (!this.isShooting) {
			let tempX = this.x;
			let tempY = this.y;
			this.bullet = new Bullet(this.ctx, this, type, this.dir);
			if (this.dir === Constant.LEFT) {
				tempX = this.x - this.bullet.size;
				tempY = this.y + Math.trunc(this.size / 2) - Math.trunc( this.bullet.size / 2);
			} else if (this.dir === Constant.RIGHT) {
				tempX = this.x + this.size;
				tempY = this.y + Math.trunc(this.size / 2) - Math.trunc(this.bullet.size / 2);
			} else if (this.dir === Constant.UP) {
				tempX = this.x + Math.trunc(this.size / 2) - Math.trunc(this.bullet.size / 2);
				tempY = this.y - this.bullet.size;
			} else if (this.dir === Constant.DOWN) {
				tempX = this.x + Math.trunc(this.size / 2) - Math.trunc(this.bullet.size / 2);
				tempY = this.y + this.size;
			}

			this.bullet.x = tempX;
			this.bullet.y = tempY;
			if (!this.isAI) {
				Constant.ATTACK_AUDIO.play();
			}

			this.bullet.draw();

			GV.bulletArray.push(this.bullet);
			this.isShooting = true;
		}
	}

	distory() {
		this.isDestoryed = true;
		// crackArray.push(new CrackAnimation(Constant.CRACK_TYPE_TANK, this.ctx, this));
	}

}


/**
 * 菜单选择坦克
 */
export class SelectTank extends Tank {
	ys: Array<number>;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);
		this.ys = [250, 281];
		this.x = 140;
		this.size = 27;
	}
}

/**
 * 玩家tank
 */
export class PlayerTank extends Tank {
	lives: number; // 生命值
	isProtected: boolean;
	protectedTime: number;
	offsetX: number;
	allProtectedTime: number;

	constructor(ctx: CanvasRenderingContext2D) {
		super(ctx);

		this.lives = 3;
		this.isProtected = true;
		this.offsetX = 0;
		this.speed = 2;
		this.protectedTime = 500;
		this.allProtectedTime = 500;
	}

	draw() {
		this.hit = false;
		this.ctx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS['player'][0] + this.offsetX + this.dir * this.size, Constant.POS['player'][1], this.size, this.size, this.x, this.y, this.size, this.size);
		if (this.isProtected) {
			const temp = Math.trunc((this.allProtectedTime - this.protectedTime) / 5) % 2;
			this.ctx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS['protected'][0], Constant.POS['protected'][1] + this.size * temp, this.size, this.size, this.x, this.y, this.size, this.size);
			this.protectedTime--;
			if (this.protectedTime === 0) {
				this.isProtected = false;
			}
		}
	}

	distory() {
		this.isDestoryed = true;
		GV.crackArray.push(new CrackAnimation(Constant.CRACK_TYPE_TANK, this.ctx, this));
		Constant.PLAYER_DESTROY_AUDIO.play();
	}

	renascenc(player) {
		this.lives--;
		this.dir = Constant.UP;
		this.isProtected = true;
		this.protectedTime = 500;
		this.isDestoryed = false;
		let temp = 0;
		if (player === 1) {
			temp = 129;
		}else {
			temp = 256;
		}
		// this.x = temp + this.map.offsetX;
		// this.y = 385 + this.map.offsetY;
	}
}


/**
 * 敌方tank
 */
class EnemyTank extends Tank {
	isAppear: boolean;
	times: number;
	lives: number;
	drawMap: Array<number>;

	constructor(ctx: CanvasRenderingContext2D, type) {
		super(ctx);

		this.isAI = true;
		this.isAppear = false;
		this.times = 0;

		if (type === GV.enemyOne) {
			this.lives = 1;
			this.speed = 1.5;
			this.drawMap = Constant.POS['enemy1'];
		}else if (type === GV.enemyTwo) {
			this.lives = 2;
			this.speed = 1;
			this.drawMap = Constant.POS['enemy2'];
		}else if (type === GV.enemyThree) {
			this.lives = 3;
			this.speed = 0.5;
			this.drawMap = Constant.POS['enemy3'];
		}
	}

	draw() {
		this.times++;
		if (!this.isAppear) {
			const temp = Math.trunc(this.times / 5) % 7;
			this.ctx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS['enemyBefore'][0] + temp * this.size, Constant.POS['enemyBefore'][1], this.size, this.size, this.x, this.y, this.size, this.size);
			if (this.times === 34) {
				this.isAppear = true;
				this.shoot(2);
			}
		}else {
			this.ctx.drawImage(Constant.RESOURCE_IMAGE, this.drawMap[0] + this.dir * this.size, this.drawMap[1], this.size, this.size, this.x, this.y, this.size, this.size);
			if (this.times % 50 === 0) {
				const ra = Math.random();
				if (ra < this.shootRate) {
					this.shoot(2);
				}
				this.times = 0;
			}
		}
	}
}
