import { Bullet } from './bullet';

export class Tank {
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
	}

	move() {
		if (this.isAI && emenyStopTime > 0) {

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

		this.isHit();
		if (!this.hit) {
			this.x = this.tempX;
			this.y = this.tempY;
		}
	}

	isHit() {
		if (this.dir === Constant.LEFT) {
			if (this.x <= map.offsetX) {
				this.x = map.offsetX;
				this.hit = true;
			}
		}else if (this.dir === Constant.RIGHT) {
			if (this.x >= map.offsetX + map.mapWidth - this.size) {
				this.x = map.offsetX + map.mapWidth - this.size;
				this.hit = true;
			}
		}else if (this.dir === Constant.UP) {
			if (this.y <= map.offsetY) {
				this.y = map.offsetY;
				this.hit = true;
			}
		}else if (this.dir === Constant.DOWN) {
			if (this.y >= map.offsetY + map.mapHeight - this.size) {
				this.y = map.offsetY + map.mapHeight - this.size;
				this.hit = true;
			}
		}

		if (!this.hit && tankMapCollosion(this, map)) {
			this.hit = true;
		}
	}

	isShot() {

	}

	shoot(type) {
		if (this.isAI && emenyStopTime > 0) {
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

			bulletArray.push(this.bullet);
			this.isShooting = true;
		}
	}

	distory() {
		this.isDestoryed = true;
		crackArray.push(new CraAnimation(Constant.CRACK_TYPE_TANK, this.ctx, this));
	}

}
