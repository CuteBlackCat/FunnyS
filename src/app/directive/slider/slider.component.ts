import { Component, Input, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild, HostListener } from '@angular/core';

import { HTMLInputEvent } from '../../interface';

@Component({
	selector: 'fs-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css']
})

export class SliderComponent implements AfterViewInit {
	@ViewChild('slider') slider: ElementRef;

	@Input() imgs: Array<object>;
	@Input() timing: number;

	@Output() select = new EventEmitter<string>();

	curIndex: number;
	timer: any;

	constructor() {
		this.curIndex = 0;
		this.timing = this.timing ? this.timing : 2000;
	}

	slideImg(i) {
		if (i >= this.imgs.length) {
			this.curIndex = 0;
		}else if (i < 0) {
			this.curIndex = this.imgs.length - 1;
		}else {
			this.curIndex = i;
		}
	}

	/**
	 * 点击图片出发的跳转事件
	 * @param href 点击图片所要跳转的路由
	 */
	blankTo(href: string) {
		this.select.emit(href);
	}

	/**
	 * 循环幻灯片
	*/
	slideLoop() {
		this.timer = setTimeout(() => {
			this.slideImg(this.curIndex + 1);
			this.slideLoop();
		}, this.timing);
	}

	@HostListener('mouseenter', ['$event'])
	onMouseEnter(e: HTMLInputEvent) {
		clearTimeout(this.timer);
	}

	@HostListener('mouseleave', ['$event.target'])
	onMouseLeave(e: HTMLInputEvent) {
		this.slideLoop();
	}

	ngAfterViewInit() {
		this.slideLoop();
	}
}
