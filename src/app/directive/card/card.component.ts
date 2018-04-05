import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
	selector: 'fs-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.css']
})

export class CardComponent {
	front  = true;

	@Input() card: object;

	@Output() enterCard = new EventEmitter<object>();

	@HostListener('click', ['$event.target'])
	onClick() {
		this.enterCard.emit(this.card);
	}

}
