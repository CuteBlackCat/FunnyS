import { GlobalService } from './service/global.service';
import { Component, OnInit } from '@angular/core';
import { LocalStorage } from './service/local.storage';
import { Router, NavigationEnd } from '@angular/router';
import { All } from './interface';

@Component({
	selector: 'fs-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Funnys';

	user: All;

	constructor(
		globalService: GlobalService,
		private local: LocalStorage,
		private router: Router
	) {
		globalService.arrayFuc();
	}

	logout() {
		this.local.remove('user');
		this.user = this.local.getObject('user');
	}

	backHome() {
		
	}

	ngOnInit() {
		this.user = this.local.getObject('user');
		console.log(this.user);

		this.router.events
			.subscribe((event) => {
				if (event instanceof NavigationEnd) { // 当导航成功结束时执行
					this.user = this.local.getObject('user');
				}
			});
	}
}
