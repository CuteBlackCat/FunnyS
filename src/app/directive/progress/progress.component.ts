import { HTMLInputEvent } from './../../interface';
import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
@Component({
	selector: 'fs-progress',
	templateUrl: './progress.component.html',
	styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit, OnChanges {
	@Input() width: number;
	@Input() type: string;
	@Output() move: EventEmitter<number> = new EventEmitter<number>();

	@ViewChild('progress') progress: ElementRef;

	timeNode: any;
	draging: boolean;
	viewWidth: string;
	allWidth: number;

	ngOnInit() {
		this.draging = false;

		this.timeNode = this.progress.nativeElement.querySelector('.time-node');

		this.allWidth = this.type === 'timeing' ? 630 : 105;

		const drag = {
			disX: 0,
			curX: 0,
			oldX: 0
		};

		const moveBtn = (e) => {
			drag.curX = e.clientX;
			drag.disX = drag.curX - drag.oldX;
			this.width = drag.disX;

			if (this.width < 0) {
				this.width = 0;
			}

			this.width = this.width > this.allWidth ? this.allWidth : this.width;

			this.viewWidth = this.width + 'px';
		};

		const moveUp = () => {
			console.log(this.width, this.allWidth);
			this.move.emit(this.width / this.allWidth);
			window.removeEventListener('mousemove', moveBtn);
			window.removeEventListener('mouseup', moveUp);
			this.draging = false;
		};

		const clickBtn = () => {
			window.addEventListener('mousemove', moveBtn);
			window.addEventListener('mouseup', moveUp);
		};

		window.addEventListener('mousedown', (e: any) => {
			if (e.target.className === 'time-node') {
				this.draging = true;
				drag.oldX = e.clientX;
				clickBtn();
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {
		if (!this.draging) {
			this.width = changes['width'].currentValue;
			this.viewWidth = this.width + 'px';
			console.log(1);
		}
	}
}
