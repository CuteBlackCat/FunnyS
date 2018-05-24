import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../story.service';

@Component({
	selector: 'fs-story-list',
	templateUrl: './story-list.component.html',
	styleUrls: ['./story-list.component.css']
})

export class StoryListComponent implements OnInit {

	type: string;
	condition: number;
	storys: Array<object>;
	color: string;
	name: string;
	info: string;
	loading: boolean;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private http: ConfigService
	) {

	}

	/**
	 * 点击故事事件
	 * @param story 事件监听，返回story
	 */
	enterStory(story) {
		this.router.navigate(['../detail', {storyid: story.storyID}], {relativeTo: this.route});
	}

	getStory() {
		this.loading = true;
		this.http.postConfig(`/get_novel_base_info?novelType=${this.name}&type=${this.condition}`, {})
			.subscribe(
				res => {
					console.log(res);
					this.storys = res['data'];
					if (!this.storys || this.storys.length === 0) {
						this.info = '客观，暂时搜不到该类型噢~';
					}

					this.loading = false;
				}
			);
	}


	ngOnInit() {

		// 获取路由中的故事type，通过type加载故事类型
		// this.type = this.route.snapshot.paramMap.get('type');
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.type = params.get('type');
				this.condition = Number(params.get('condition'));

				this.type = this.type === null ? '0' : this.type;

				this.name = params.get('name');

				if (this.condition !== 0 && this.condition !== 1) {
					this.condition = 0;
				}

				this.getStory();
			}
		);

		this.color = 'greener';
	}
}
