import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../story.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'fs-story-type',
	templateUrl: './story-type.component.html',
	styleUrls: ['./story-type.component.css']
})

export class StoryTypeComponent implements OnInit {

	types: Array<string>;
	condition: number;
	name: string;
	activeType: string;

	constructor(
		private http: ConfigService,
		private router: Router,
		private route: ActivatedRoute,
	) {

	}

	getStoryTypes() {
		this.http.getConfig('/get_novel_type', {}).subscribe(
			data => {
				console.log(data);
				this.types = data['data'];
				console.log(this.types);
				this.activeType = this.types[0];
			}
		);
	}

	searchStory(type, i) {
		this.router.navigate([`/story/list`, {type: i, condition: this.condition, name: type}]);
	}

	ngOnInit() {
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.condition = Number(params.get('condition'));

				this.name = params.get('name');

				if (this.condition !== 0 && this.condition !== 1) {
					this.condition = 0;
				}
			}
		);

		this.getStoryTypes();
	}
}
