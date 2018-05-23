import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
	selector: 'fs-alert-info',
	template: `
		<div class="alert" [class.active]="active">{{info}}</div>
	`,
	styles: [`
		.alert{
			position: fixed;
			top: 50%;
			left:50%;
			transform: translate(-50%);
			padding: 0 30px;
			border-radius: 8px;
			line-height:60px;
			text-align:center;
			background: #000;
			color:#fff;
			opacity: 0;
			display:none;
		}
		@keyframes hide {
			0%{
				opacity: 0;
			}
			50%{
				opacity: .8;
			}
			100%{
				opactiy: 0;
			}
		}
		.alert.active {
			display:block;
			animation-name: hide;
			animation-duration: 1s;
		}
	`]
})
export class AlertComponent implements OnChanges {
	@Input() info: string;

	active: boolean;

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
		if ((changes.info && changes.info.previousValue !== changes.info.currentValue && changes.info.currentValue !== '') || changes.info.firstChange === true) {
			this.info = changes.info.currentValue;
			this.active = true;
			console.log(this.active);
			setTimeout(() => {
				this.active = false;
				this.info = '';
			}, 800);
		}
	}
}
