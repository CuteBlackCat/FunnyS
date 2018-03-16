import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Snake, SuperSnake } from './snake';
import { Food } from './foods';

@Component({
	selector: 'fs-snake',
	template: `<div class="game">
		<canvas #snake></canvas>
		<div class="btn-back" #btn>
			<div class="btn"></div>
		</div>
	</div>`,
	styleUrls: ['./snake.css']
})
export class SnakeComponent implements OnInit {

	ctx: CanvasRenderingContext2D;
	w: number;
	h: number;
	snake: any[];
	speed: number;
	foods: any[];
	foodsLen: number;
	foodWeight: number;
	btn;
	btnAngle: number;
	superSnake: SuperSnake;
	superSpeed: number;

	@ViewChild('snake') snakeRef: ElementRef;
	@ViewChild('btn') btnRef: ElementRef;
	constructor() {
		this.snake = [];
		this.foods = [];
		this.speed = 4;
		this.foodsLen = 200;
		this.foodWeight = 3;
		this.btnAngle = Math.random();
		this.superSpeed = this.speed;
	}

	init() {
		this.createSnake(10);
		this.createFood(this.foodsLen, this.foodWeight);
		this.createSuperSnake();
		this.draw();
	}

	createSnake(num) {
		for (let i = 0; i < num; i++) {
			const name = '游客' + Math.floor(Math.random() * 20000000000);
			// const rgba =
			const color: [string] = [`rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},1)`];
			const length = 5 + Math.random() * 15;
			const weight = 5 + (length - 5) * 0.1;
			const x = Math.random() * this.w;
			const y = Math.random() * this.h;
			const snake = new Snake(name, color, length, weight, x, y);

			this.snake.push(snake);
		}
	}

	createFood(num, weight) {
		for (let i = 0; i < num; i++) {
			const color = `rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},1)`;
			const x = Math.random() * this.w;
			const y = Math.random() * this.h;
			const food = new Food(x, y, color, weight);

			this.foods.push(food);
		}
	}

	createSuperSnake() {
		const len = 10;
		const weight = 5 + (len - 5) * 0.1;
		const x = Math.random() * this.w;
		const y = Math.random() * this.h;
		const color = `rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},1)`;
		this.superSnake = new SuperSnake('lijiaxin', color, len, weight, x, y);
		this.superSnake.angle = this.btnAngle;
	}

	draw() {
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.drawSnake();
		this.drawFood();
		this.drawSuperSnake();
		this.eatFood();

		const _self = this;
		requestAnimationFrame(() => {
			_self.draw();
		});
	}

	drawFood() {
		// const needFoods = this.foodsLen - this.foods.length;
		const needFoods = Math.ceil(Math.random() * 50);
		if (needFoods > 49) {
			this.createFood(1, this.foodWeight);
		}
		this.foods.forEach((food) => {
			food.drawFood(this.ctx);
		});
	}

	drawSnake() {
		let dead = [];
		for (let i = 0; i < this.snake.length; i++) {
			this.snake[i].drawSnake(this.ctx, this.w, this.h);
			const alive = this.snake[i].move(this.speed, this.w, this.h);
			if (!alive) {
				dead.push(i);
				continue;
			}
			for (let j = i + 1; j < this.snake.length; j++) {
				const crash = this.snake[i].brokenOther(this.snake[j]);
				if (!crash) {
					dead.push(i);
					break;
				}
			}
		}
		dead.forEach((item) => {
			const _self = this;
			this.snake[item].snake.forEach((position, i) => {
				if (i % 2) {
					const color = _self.snake[item].color[0];
					const x = Math.random() * 5 + position[0];
					const y = Math.random() * 5 + position[1];
					const food = new Food(x, y, color, this.foodWeight * 2);
					this.foods.push(food);
				}
			});
		});

		dead = Array.from(new Set(dead)).sort(() => {
			return 1;
		});

		dead.forEach((item) => {
			this.snake.splice(item, 1);
		});
	}

	drawSuperSnake() {
		if (this.superSnake === null) {
			return false;
		}
		this.superSnake.drawSnake(this.ctx, this.w, this.h);
		const alive = this.superSnake.move(this.superSpeed, this.w, this.h);
		if (!alive) {
			const _self = this;
			this.superSnake.snake.forEach((position, i) => {
				if (i % 2) {
					const color = _self.superSnake.color[0];
					const x = Math.random() * 5 + position[0];
					const y = Math.random() * 5 + position[1];
					const food = new Food(x, y, color, this.foodWeight * 2);
					this.foods.push(food);
				}
			});
			this.superSnake = null;
		}
	}

	eatFood() {
		this.snake.forEach((snake) => {
			const deadFood = [];
			this.foods.forEach((food, i) => {
				const distance = Math.sqrt(Math.pow((snake.x - food.x), 2) + Math.pow((snake.y - food.y), 2));
				if (distance <= snake.weight + food.weight) {
					deadFood.push(i);
					snake.growUp(food.weight / this.foodWeight);
				}
			});
			deadFood.forEach((i) => {
				this.foods.splice(i, 1);
			});
		});

		if (this.superSnake !== null) {
			const superdeadFood = [];
			this.foods.forEach((food, i) => {
				const distance = Math.sqrt(Math.pow((this.superSnake.x - food.x), 2) + Math.pow((this.superSnake.y - food.y), 2));
				if (distance <= this.superSnake.weight + food.weight) {
					superdeadFood.push(i);
					this.superSnake.growUp(food.weight / this.foodWeight);
				}
			});
			superdeadFood.forEach((i) => {
				this.foods.splice(i, 1);
			});
		}
	}


	ngOnInit() {
		this.ctx = this.snakeRef.nativeElement.getContext('2d');
		this.w = this.snakeRef.nativeElement.width = this.snakeRef.nativeElement.offsetWidth;
		this.h = this.snakeRef.nativeElement.height = this.snakeRef.nativeElement.offsetHeight;

		this.btn = this.btnRef.nativeElement.querySelector('.btn');

		const btnBackOffetX = this.btnRef.nativeElement.offsetLeft;
		const btnBackOffetY = this.btnRef.nativeElement.offsetTop;
		const btnBackOffetW = this.btnRef.nativeElement.offsetWidth;
		const btnBackOffetH = this.btnRef.nativeElement.offsetHeight;
		const centerX = btnBackOffetX + btnBackOffetW / 2;
		const centerY = btnBackOffetY + btnBackOffetH / 2;

		const moveBtn = (e) => {
			if(this.superSnake === null){
				return false;
			}
			const clientX = e.clientX;
			const clientY = e.clientY;
			const distance = Math.sqrt(Math.pow((clientX - centerX), 2) + Math.pow((clientY - centerY), 2));
			const angle = Math.asin((centerY - clientY) / distance) * 180 / Math.PI;
			if (clientY < centerY) {
				this.btnAngle = centerX < clientX ? angle : 180 - angle;
			} else {
				this.btnAngle = centerX < clientX ? 360 + angle : 180 - angle;
			}
			if (distance < btnBackOffetW / 2) {
				const x = clientX - centerX;
				const y = clientY - centerY;
				this.btn.style['transform'] = `translate(${x}px, ${y}px)`;
			}else {
				const x = Math.cos(this.btnAngle * 2 * Math.PI / 360) * btnBackOffetW / 2;
				const y = -Math.sin(this.btnAngle * 2 * Math.PI / 360) * btnBackOffetH / 2;
				this.btn.style['transform'] = `translate(${x}px, ${y}px)`;
			}
			this.superSnake.angle = this.btnAngle;
		};

		const clickBtn = () => {
			window.addEventListener('mousemove', moveBtn);
			window.addEventListener('mouseup', () => {
				this.btn.style['transform'] = `translate(${0}px, ${0}px)`;
				window.removeEventListener('mousemove', moveBtn);
			});
		};

		window.addEventListener('mousedown', (e: HTMLInputEvent) => {
			if (e.target.className === 'btn') {
				clickBtn();
			}
		});

		window.addEventListener('load', () => {
			this.init();
		});
	}
}

interface HTMLInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}


