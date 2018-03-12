import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Snake } from './snake';

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

	@ViewChild('snake') snakeRef: ElementRef;
	constructor() {
		this.snake = [];
		this.speed = 5;
	}

	init(num) {
		for (let i = 0; i < num; i++) {
			const name = '游客' + Math.random() * 20000000000;
			// const rgba =
			const color: [string] = [`rgba(${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},${Math.ceil(Math.random() * 255)},1)`];
			const length = 5 + Math.random() * 15;
			const weight = 5 + (length - 5) * 0.01;
			const x = Math.random() * this.w;
			const y = Math.random() * this.h;
			const snake = new Snake(name, color, length, weight, x, y);

			this.snake.push(snake);
		}

		this.draw();
	}

	draw() {
		this.ctx.clearRect(0, 0, this.w, this.h);
		this.drawSnake();

		const _self = this;
		requestAnimationFrame(() => {
			_self.draw();
		});
	}

	drawSnake() {
		const _self = this;
		const dead = [];
		for (let i = 0; i < this.snake.length; i++) {
			this.snake[i].drawSnake(this.ctx, this.w, this.h);
			const alive = this.snake[i].move(this.speed, _self.w, _self.h);
			if (!alive) {
				dead.push(i);
			}
		}
		dead.forEach((item) => {
			this.snake.splice(item, 1);
		});
	}


	ngOnInit() {
		this.ctx = this.snakeRef.nativeElement.getContext('2d');
		this.w = this.snakeRef.nativeElement.width = this.snakeRef.nativeElement.offsetWidth;
		this.h = this.snakeRef.nativeElement.height = this.snakeRef.nativeElement.offsetHeight;

		window.addEventListener('load', () => {
			this.init(2);
		});
	}
}

