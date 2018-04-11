import { Component, Input } from '@angular/core';
@Component({
	selector: 'fs-engineer',
	templateUrl: './engineer.component.html',
	styleUrls: ['./engineer.component.css']
})
export class EngineerComponent {
	@Input() engineer;
}
