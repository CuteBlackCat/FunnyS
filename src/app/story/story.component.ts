import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'fs-story',
	templateUrl: './story.component.html',
	styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

	types: Array<object>;

	curType: number;

	curTitle: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute
	) {
		this.curType = 0;

		this.curTitle = 'hot';

		this.types = [
			{
				typeId: 0,
				typeName: '全部'
			},
			{
				typeId: 1,
				typeName: '内涵段子'
			},
			{
				typeId: 2,
				typeName: '恐怖故事'
			},
			{
				typeId: 3,
				typeName: '伤感故事'
			},
			{
				typeId: 4,
				typeName: '爱情故事'
			},
			{
				typeId: 5,
				typeName: '其他故事'
			}
		];
	}

	searchStory(id: number) {
		this.curType = id;
		this.router.navigate(['/story/list', { type: id, condition: this.curTitle}]);
	}

	searchTitle(title: string) {
		this.curTitle = title;
		this.router.navigate(['/story/list', { type: this.curType, condition: this.curTitle }]);
	}

	ngOnInit() {
		// this.router.navigate(['/story/list', { type: this.curType, condition: this.curTitle }]);
	}

}
