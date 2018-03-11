import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';

@Component({
	selector: 'fs-backcanvas',
	template: `<canvas #backCanvas ></canvas>`,
	styles: ['canvas{width:100%;height:100%;display:block}']
})
export class BackcanvasComponent implements OnInit {
	ctx: CanvasRenderingContext2D;
	w: number;
	h: number;
	circles: any[];
	current_circle: CurrentCircle;

	@ViewChild('backCanvas') canvasRef: ElementRef;

	constructor() {
		this.circles = [];
		this.current_circle = new CurrentCircle(0, 0);
	}

	draw() {
		this.ctx.clearRect(0, 0, this.w, this.h);
		for (let i = 0; i < this.circles.length; i++) {
			this.circles[i].move(this.w, this.h);
			this.circles[i].drawCircle(this.ctx);
			for (let j = i + 1; j < this.circles.length; j++) {
				this.circles[i].drawLine(this.ctx, this.circles[j]);
			}
		}

		if (this.current_circle.x) {
			this.current_circle.drawCircle(this.ctx);
			for (let k = 1; k < this.circles.length; k++) {
				this.current_circle.drawLine(this.ctx, this.circles[k]);
			}
		}

		const _self = this;

		requestAnimationFrame(() => {
			_self.draw();
		});
	}

	init(num) {
		for (let i = 0; i < num; i++) {
			this.circles.push(new Circle(Math.random() * this.w, Math.random() * this.h));
		}
		this.draw();
	}

	ngOnInit() {
		this.ctx = this.canvasRef.nativeElement.getContext('2d');
		this.w = this.canvasRef.nativeElement.width = this.canvasRef.nativeElement.offsetWidth;
		this.h = this.canvasRef.nativeElement.height = this.canvasRef.nativeElement.offsetHeight;

		window.addEventListener('load', () => {
			this.init(60);
		});

		window.addEventListener('mousemove', (e) => {
			// const el = e || window.event;
			this.current_circle.x = e.clientX;
			this.current_circle.y = e.clientY;
		});

		window.addEventListener('mouseout', (e) => {
			this.current_circle.x = null;
			this.current_circle.y = null;
		})
	}
}

class Circle {
	x: number;
	y: number;
	r: number;
	private _mx: number;
	private _my: number;
	private distance: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
		this.r = Math.random() * 10;
		this._mx = Math.random();
		this._my = Math.random();
		this.distance = 150;
	}

	drawCircle(ctx: CanvasRenderingContext2D) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.r, 0, 360);
		ctx.closePath();
		ctx.fillStyle = 'rgba(204,204,204,.3)';
		ctx.fill();
	}

	drawLine(ctx: CanvasRenderingContext2D, _circle) {
		const dx = this.x - _circle.x;
		const dy = this.y - _circle.y;
		const distance = Math.sqrt(dx * dx + dy * dy);

		if (distance < this.distance) {
			ctx.beginPath();
			ctx.moveTo(this.x, this.y);
			ctx.lineTo(_circle.x , _circle.y);
			ctx.closePath();
			ctx.strokeStyle = 'rgba(204,204,204,.3)';
			ctx.stroke();
		}
	}

	move(w, h) {
		this._mx = (this.x < w && this.x > 0) ? this._mx : (-this._mx);
		this._my = (this.y < h && this.y > 0) ? this._my : (-this._my);
		this.x += this._mx / 2;
		this.y += this._my / 2;
	}
}

class CurrentCircle extends Circle {
	constructor(x, y) {
		super(x, y);
	}

	drawCircle(ctx) {
		ctx.beginPath();
		this.r = 8;
		ctx.arc(this.x, this.y, this.r, 0, 360);
		ctx.closePath();
		ctx.fillStyle = 'rgba(255,77,54,.6)';
		ctx.fill();
	}
}




