import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ConfigService } from './story.service';

@Component({
	selector: 'fs-story',
	templateUrl: './story.component.html',
	styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

	types: Array<object>;

	curType: string;

	curTitle: number;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private http: ConfigService
	) {

		this.curTitle = 0;

		console.log(this.router.url);
	}

	searchStory(id: string) {
		this.curType = String(id);
		if (id === '10') {
			this.router.navigate(['/story/public', { type: id,   condition: this.curTitle }]);
			return;
		}
		if (id === '11') {
			this.router.navigate(['/story/type', { type: id, condition: this.curTitle }]);
			return;
		}
		console.log(this.curType);
		this.router.navigate(['/story/list', { type: id, name: this.types[this.curType],  condition: this.curTitle}]);
	}

	searchTitle(title: number) {
		this.curTitle = title;
		this.router.navigate(['/story/list', { type: this.curType, name: this.types[this.curType], condition: this.curTitle }]);
	}

	ngOnInit() {

		this.http.getConfig('/get_novel_type', {}).subscribe(
			data => {
				this.types = data['data'].slice(0, 10);

				let detail = false;

				if (this.router.url.includes('detail')) {
					detail = true;
				}

				this.route.firstChild.paramMap.subscribe(
					(params: ParamMap) => {
						this.curType = params.get('type');
						console.log(this.curType);
						if (!this.curType && !detail) {
							this.searchStory('0');
						}
						this.curType = this.curType ? this.curType : '0';
					}
				);
			}
		);

	}

}
