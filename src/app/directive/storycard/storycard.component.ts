import { Component, Input, Output, EventEmitter, HostListener} from '@angular/core';

@Component({
	selector: 'fs-story-card',
	templateUrl: './storycard.component.html',
	styleUrls: ['./storycard.component.css']
})

export class StoryCardComponent {
	@Input() card: object;

	@Output() enterCard = new EventEmitter<object>();

	@HostListener('click', ['$event.target'])
	onClick() {
		this.enterCard.emit(this.card);
	}
}
