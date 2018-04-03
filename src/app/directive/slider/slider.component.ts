import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
	selector: 'fs-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css']
})

export class SliderComponent implements AfterViewInit {
	@Input() imgs: Array<object>;
	@Input() timing: number;

	@Output() select = new EventEmitter<string>();

	curIndex: number;

	constructor() {
		this.curIndex = 0;
		this.timing = this.timing ? this.timing : 2000;
	}

	slideImg(i) {
		if (i >= this.imgs.length) {
			this.curIndex = 0;
		}else if (i <= 0) {
			this.curIndex = this.imgs.length;
		}else {
			this.curIndex = i;
		}
	}

	blankTo(href: string) {
		this.select.emit(href);
	}

	slideLoop() {
		setTimeout(() => {
			this.slideImg(this.curIndex + 1);
			this.slideLoop();
		}, this.timing);
	}

	ngAfterViewInit() {
		this.slideLoop();
	}
}
