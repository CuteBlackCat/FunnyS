import { Component, Input, Output, EventEmitter, HostListener} from '@angular/core';
import { All } from '../../interface';

@Component({
	selector: 'fs-story-card',
	templateUrl: './storycard.component.html',
	styleUrls: ['./storycard.component.css']
})

export class StoryCardComponent {
	@Input() card: All;

	@Input() color: string;

	@Output() enterCard = new EventEmitter<object>();


	onClick() {
		this.enterCard.emit(this.card);
	}
}
