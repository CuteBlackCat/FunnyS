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
	@Output() move: EventEmitter<any> = new EventEmitter<any>();

	@ViewChild('progress') progress: ElementRef;

	timeNode: any;
	draging: boolean;
	viewWidth: string;

	ngOnInit() {
		this.timeNode = this.progress.nativeElement.querySelector('.time-node');

		console.log(this.timeNode.clientX);

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

			const width = this.type === 'timeing' ? 630 : 105;
			this.width = this.width > width ? width : this.width;

			console.log(this.width);

			this.viewWidth = this.width + 'px';
		};

		const clickBtn = () => {
			window.addEventListener('mousemove', moveBtn);
			window.addEventListener('mouseup', () => {
				window.removeEventListener('mousemove', moveBtn);
			});
		};

		window.addEventListener('mousedown', (e: any) => {
			if (e.target.className === 'time-node') {
				drag.oldX = e.clientX;
				clickBtn();
			}
		});
	}

	ngOnChanges(changes: SimpleChanges) {

	}
}
