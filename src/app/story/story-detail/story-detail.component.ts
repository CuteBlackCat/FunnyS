import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-story-detail',
	templateUrl: './story-detail.component.html',
	styleUrls: ['./story-detail.component.css']
})

export class StoryDetailComponent implements OnInit {
	ancestor: object;

	bookOpen: boolean;

	hot: boolean;
	lover: boolean;
	close: boolean;

	allStorys: Array<Array<object>>;
	currentStory: object;


	ngOnInit() {
		this.ancestor = {
			storyName: '安河桥的故事',
			hot: 4396,
			introduction: '从南到北...',
			content: '故事到这里就结束了最近有观看我主讲的《Hadoop基础与演练》课程的同学问到Hadoop环境到底应该怎么安装。Hadoop的安装其实非常的简单，网上有很多教程，官网也有示例。但是可能部分同学对于linux不太熟悉，导致安装的时候会遇到各种问题，打击学习激情。本文就来详细的讲解一下如何配置Hadoop2的伪分布式环境，帮助我们对其进行学习。 注：大家还是要学习一些linux基本命令，用到的时候很多 接下来我们进入正题',
			author: '宋冬野',
			publicTime: '2018.3.7',
			storyId: 88,
			parentId: 0,
			typeId: 2,
			comment: 200
		};

		this.allStorys = [
			[
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor
			],
			[
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor
			],
			[
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor
			],
		];

		this.bookOpen = false;
		this.hot = false;
		this.lover = false;
		this.close = false;
	}
}
