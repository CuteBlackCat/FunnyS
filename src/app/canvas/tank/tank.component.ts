import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-tank',
	template: `<div #tankwrap>
		<canvas #wall></canvas>
		<canvas #tank></canvas>
		<canvas #over></canvas>
		<canvas #stage></canvas>
	</div>`,
	styles: ['']
})
export class TankComponent implements OnInit {

	constructor() {
		
	}

	ngOnInit() {

	}
}

