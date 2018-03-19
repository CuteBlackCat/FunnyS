export class Snake {
	public color: [string];
	public name: string;
	public length: number;
	public weight: number;
	public x: number;
	public y: number;
	public angle: number;
	public cover: number;
	public snake: [[number, number]];


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
				ctx.fillStyle = '#999';
				ctx.font = '12px serif';
				if (this.angle < 180) {
					ctx.fillText(this.name, this.x - 50, this.y - 25, 100);
				}else {
					ctx.fillText(this.name, this.x - 50, this.y + 25, 100);
				}
			}
		}
	}

	move(speed, w , h) {
		const angle = this.angle * 2 * Math.PI / 360;
		const x = speed * Math.cos(angle);
		const y = speed * (-Math.sin(angle));
		this.x += x;
		this.y += y;
		if (this.x <= 0 || this.x >= w || this.y <= 0 || this.y >= h) {
			return false;
		}
		if (this.weight + this.x >= w || this.x - this.weight <= 0 || this.y + this.weight >= h || this.y - this.weight <= 0) {
			return false;
		}
		if (this.weight + this.x + speed >= w || this.x - this.weight - speed <= 0 || this.y + this.weight + speed >= h || this.y - this.weight - speed <= 0) {
			return this.switchDirective();
		}else {
			this.snake.pop();
			this.snake.unshift([this.x, this.y]);
		}
		return true;
	}

	brokenOther(snake) {
		let result = true;
		snake.snake.forEach((x, y) => {
			const distance = Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
			if (distance < this.weight + snake.weight + 5 && distance > this.weight + snake.weight) {
				result = this.switchDirective();
			} else if (distance <= this.weight + snake.weight) {
				result = false;
			}
		});
		return result;
	}

	private switchDirective() {
		const deadRate = Math.random();
		if (deadRate > 0.2) {
			let changeAngle = Math.random() * 180;
			changeAngle = changeAngle > 90 ? changeAngle : 90 + changeAngle;
			this.angle += changeAngle;
			return true;
		}
		return false;
	}

	growUp(num) {
		const len = this.snake.length;
		const x = this.snake[len - 1][0] - this.snake[len - 2][0];
		const y = this.snake[len - 1][1] - this.snake[len - 2][1];
		for (let i = 0; i < num; i++) {
			const position: [number, number] = [x + i * this.snake[len - 1][0], y + i * this.snake[len - 1][1]];
			this.snake.push(position);
			this.weight = 5 + (len - 5) * 0.05;
		}
	}
}

export class SuperSnake extends Snake {
	public protect: boolean;

	constructor(name, color, length, weight, x, y) {
		super(name, color, length, weight, x, y);

		this.protect = true;

		const _self = this;
		window.setTimeout(() => {
			_self.protect = false;
		}, 2000);
	}

	move(speed, w, h) {
		const angle = this.angle * 2 * Math.PI / 360;
		const x = speed * Math.cos(angle);
		const y = speed * (-Math.sin(angle));
		this.x += x;
		this.y += y;
		if (this.x <= 0 || this.x >= w || this.y <= 0 || this.y >= h) {
			return false;
		}
		if (this.weight + this.x >= w || this.x - this.weight <= 0 || this.y + this.weight >= h || this.y - this.weight <= 0) {
			return false;
		}else {
			this.snake.pop();
			this.snake.unshift([this.x, this.y]);
		}
		return true;
	}

	brokenOther(snake) {
		let result = true;
		snake.snake.forEach(([x, y]) => {
			const distance = Math.sqrt(Math.pow((this.x - x), 2) + Math.pow((this.y - y), 2));
			if (distance <= this.weight + snake.weight) {
				result = false;
			}
		});
		return result;
	}

	protectedSnake(ctx) {
		ctx.beginPath();
		const i = Math.ceil(this.snake.length / 2);
		const radius = this.weight * this.length * 2;
		ctx.arc(this.snake[i][0], this.snake[i][1], radius, 0, 360);
		ctx.closePath();
		// ctx.globalAlpha = 0.3;
		ctx.fillStyle = 'rgba(0,0,255,.3)';
		ctx.fill();
	}
}
