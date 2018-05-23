import { GlobalService } from './service/global.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from './service/local.storage';

@Component({
	selector: 'fs-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Funnys';

	user: object;

	constructor(
		globalService: GlobalService,
		private local: LocalStorage
	) {
		globalService.arrayFuc();
	}

	ngOnInit() {
		this.user = this.local.getObject('user');
		console.log(this.user);
	}
}
