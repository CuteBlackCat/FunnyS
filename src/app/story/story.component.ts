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

	curTitle: string;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private http: ConfigService
	) {

		this.curTitle = 'hot';

		this.types = [
			{
				typeId: '0',
				typeName: '全部'
			},
			{
				typeId: '1',
				typeName: '内涵段子'
			},
			{
				typeId: '2',
				typeName: '恐怖故事'
			},
			{
				typeId: '3',
				typeName: '伤感故事'
			},
			{
				typeId: '4',
				typeName: '爱情故事'
			},
			{
				typeId: '5',
				typeName: '其他故事'
			},
			{
				typeId: '6',
				typeName: '我要发布'
			}
		];
		console.log(this.router.url);
	}

	searchStory(id: string) {
		this.curType = String(id);
		if (id === '6') {
			this.router.navigate(['/story/public', { type: id, condition: this.curTitle }]);
			return;
		}
		console.log(this.curType);
		this.router.navigate(['/story/list', { type: id, condition: this.curTitle}]);
	}

	searchTitle(title: string) {
		this.curTitle = title;
		this.router.navigate(['/story/list', { type: this.curType, condition: this.curTitle }]);
	}

	ngOnInit() {
		this.route.firstChild.paramMap.subscribe(
			(params: ParamMap) => {
				this.curType = params.get('type');
				console.log(this.curType);
				this.curType = this.curType ? this.curType : '0';
			}
		);

		this.http.getConfig('/get_novel_type', {}).subscribe(
			data => {
				console.log(data);
			}
		);

	}

}
