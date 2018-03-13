import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Snake } from './snake';
import { Food } from './foods';

@Component({
	selector: 'fs-snake',
	template: `<div class="game">
		<canvas #snake></canvas>
		<div class="btn-back">
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

	@ViewChild('snake') snakeRef: ElementRef;
	constructor() {
		this.snake = [];
		this.foods = [];
		this.speed = 4;
		this.foodsLen = 200;
		this.foodWeight = 3;
	}

	init() {
		this.createSnake(10);
		this.createFood(this.foodsLen, this.foodWeight);
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

	draw() {
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.drawSnake();
		this.drawFood();
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
		const dead = [];
		for (let i = 0; i < this.snake.length; i++) {
			this.snake[i].drawSnake(this.ctx, this.w, this.h);
			let alive = this.snake[i].move(this.speed, this.w, this.h);
			for (let j = i + 1; j < this.snake.length; j++) {
				console.log(this.snake[i].brokenOther(this.snake[j]));
				alive = alive ? this.snake[i].brokenOther(this.snake[j]) : false;
				if (!alive) {
					dead.push(i);
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
			this.snake.splice(item, 1);
		});
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
	}


	ngOnInit() {
		this.ctx = this.snakeRef.nativeElement.getContext('2d');
		this.w = this.snakeRef.nativeElement.width = this.snakeRef.nativeElement.offsetWidth;
		this.h = this.snakeRef.nativeElement.height = this.snakeRef.nativeElement.offsetHeight;

		window.addEventListener('load', () => {
			this.init();
		});
	}
}

