import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
	selector: 'fs-loading',
	template: `
		<div class="loading" [class.active]="active">Loading...</div>
	`,
	styles: [`
		.loading{
			position: fixed;
			top: 50%;
			left:50%;
			transform: translate(-50%, -50%);
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
				opacity: .1;
			}
			50%{
				opacity: .8;
			}
			100%{
				opactiy: .1;
			}
		}
		.loading.active {
			display:block;
			animation-name: hide;
			animation-duration: 2s;
			animation-iteration-count: infinite;
		}
	`]
})
export class LoadingComponent implements OnChanges {
	@Input() active: string;

	ngOnChanges(changes: SimpleChanges) {
		if (changes.active) {
			this.active = changes.active.currentValue;
		}
	}
}
