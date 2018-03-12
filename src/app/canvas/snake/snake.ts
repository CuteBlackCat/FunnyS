export class Snake {
	private color: [string];
	private name: string;
	private length: number;
	private weight: number;
	private x: number;
	private y: number;
	private angle: number;
	private cover: number;
	private snake: [[number, number]];
	private speed: number;


	constructor(name: string, color: [string], length: number, weight: number, x: number, y: number ) {
		this.color = color;
		this.name = name;
		this.length = length;
		this.weight = weight > 5 ? weight : 5;
		this.x = x;
		this.y = y;
		this.snake = [[0, 0]];
		this.snake.pop();

		// snake移动的方向
		this.angle = Math.random() * 360;

		this.cover = 0.45;
		this.speed = 5;

		this.snakePosition();
	}

	snakePosition() {
		let movex = 0;
		let movey = 0;
		const angle = this.angle * 2 * Math.PI / 360;
		movex = (2 * this.weight - this.weight * this.cover) * (-Math.cos(angle));
		movey = (2 * this.weight - this.weight * this.cover) * Math.sin(angle);


		const move = [movex, movey];

		for (let i = 0; i < this.length; i++) {
			const position: [number, number] = [this.x + move[0] * i, this.y + move[1] * i];
			this.snake.push(position);
		}
	}

	drawSnake(ctx, w, h) {
		for (let i = this.snake.length - 1; i >= 0; i--) {
			const colorI = i % this.color.length;
			ctx.beginPath();
			ctx.arc(this.snake[i][0], this.snake[i][1] , this.weight, 0, 360);
			ctx.closePath();
			ctx.fillStyle = this.color[colorI];
			ctx.fill();
			if (i === 0) {
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.weight * 0.8, 0 , 360);
				ctx.closePath();
				ctx.fillStyle = '#fff';
				ctx.fill();
				ctx.beginPath();
				ctx.arc(this.x, this.y, this.weight * 0.4, 0, 360);
				ctx.closePath();
				ctx.fillStyle = '#000';
				ctx.fill();
			}
		}
	}

	move(speed, w , h) {
		const angle = this.angle * 2 * Math.PI / 360;
		const x = speed * Math.cos(angle);
		const y = speed * (-Math.sin(angle));
		this.x += x;
		this.y += y;
		if (this.weight + this.x + speed >= w || this.x - this.weight - speed <= 0 || this.y + this.weight + speed >= h || this.y - this.weight - speed <= 0) {
			const deadRate = Math.random();
			if (deadRate > 0.2) {
				let changeAngle = Math.random() * 180;
				changeAngle = changeAngle > 90 ? changeAngle : 90 + changeAngle;
				this.angle += changeAngle;
			}else {
				return false;
			}
		}else {
			this.snake.pop();
			this.snake.unshift([this.x, this.y]);
		}
		return true;
	}
}
