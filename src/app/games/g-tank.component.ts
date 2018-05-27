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
			transform: translate(-50%, -50%);
			padding: 15px 30px;
			border-radius: 8px;
			line-height:30px;
			text-align:left;
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
			animation-duration: 2s;
		}
	`]
})
export class GTankComponent {

}
