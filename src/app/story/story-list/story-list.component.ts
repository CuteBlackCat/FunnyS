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
		this.router.navigate(['../detail', {storyid: story.storyId}], {relativeTo: this.route});
	}

	getStory() {
		this.http.postConfig(`/get_novel_base_info?novelType=${this.name}&type=${this.condition}`, {})
			.subscribe(
				res => {
					console.log(res);
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



		const story = {
			storyName: '安河桥的故事',
			hot: 4396,
			introduction: '从南到北...',
			content: '故事到这里就结束了最近有观看我主讲的《Hadoop基础与演练》课程的同学问到Hadoop环境到底应该怎么安装。Hadoop的安装其实非常的简单，网上有很多教程，官网也有示例。但是可能部分同学对于linux不太熟悉，导致安装的时候会遇到各种问题，打击学习激情。本文就来详细的讲解一下如何配置Hadoop2的伪分布式环境，帮助我们对其进行学习。 注：大家还是要学习一些linux基本命令，用到的时候很多 接下来我们进入正题',
			author: 'lijiaxin',
			publicTime: '2018.3.7',
			storyId: 88,
			parentId: 0,
			typeId: 2,
			comment: 200
		};

		this.storys = [story, story, story, story, story, story, story, story];

		this.color = 'greener';
	}
}
