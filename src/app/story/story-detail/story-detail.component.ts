import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../story.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

	firstIndex: number;

	activePage: number;
	closePage: Array<number>;

	pageIndex: number;

	allStorys: Array<Array<object>>;
	currentStory: object;

	backStory: Array<object>;

	// 加载以及错误信息
	loading: boolean;
	info: string;

	// 加载参数相关
	storyID: string;
	articleID: string;
	curStory: string;

	// 故事相关

	constructor(
		private http: ConfigService,
		private router: Router,
		private route: ActivatedRoute
	) {

	}

	checkPage(story, i, dir) {
		this.activePage = i;
		if (dir === 'back') {
			this.currentStory = story;
			this.backStory.push(this.currentStory);
			if (this.allStorys.length <= i + 2) {
				// 请求数据
				this.allStorys.push([story, story]);
			}
			this.closePage.pop();
			setTimeout(() => {
				this.pageIndex = i;
			}, 1500);
		}else {
			this.backStory.pop();
			this.currentStory = this.backStory[this.backStory.length - 1];
			this.pageIndex = i - 1;
			this.closePage.push(i);
		}
	}
	checkActive(i) {
		return this.activePage >= i;
	}

	checkClose(i) {
		return this.closePage.includes(i);
	}

	checkIndex(i) {
		return this.pageIndex >= i;
	}

	openBook(yes) {
		this.bookOpen = yes;
		this.close = !yes;

		if (yes) {
			setTimeout(() => {
				this.firstIndex = 0;
			}, 1500);
		}else {
			this.firstIndex = 999;
		}
	}

	getStoryDetail(firstArticle, articleID, storyID) {
		this.loading = true;
		this.http.postConfig(`/getNovelArticles?firstArticle=${firstArticle}&articleID=${articleID}&storyID=${storyID}`, {})
			.subscribe(
				res => {
					if (res['data'].length === 0) {

					}
					this.loading = false;
				}
			);
	}

	// getStoryIntro() {
		// this.loading = true;
		// this.http.postConfig(`/get_novel_base_info?novelType=${this.name}&type=${this.condition}`, {})
			// .subscribe(
				// res => {
					// console.log(res);
					// this.introduction = res['data'];
					// if (!this.storys || this.storys.length === 0) {
					// 	this.info = '客观，暂时搜不到该类型噢~';
					// }

					// this.loading = false;
				// }
			// );
	// }


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
			comment: 200,
			lover: true,
			callPlay: true
		};

		this.firstIndex = 999;

		this.activePage = -1;
		this.closePage = [];
		this.pageIndex = -1;

		this.currentStory = this.ancestor;

		this.backStory = [this.currentStory ];

		this.allStorys = [
			[
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor,
				this.ancestor
			]
		];

		this.bookOpen = false;
		this.hot = false;
		this.lover = false;
		this.close = false;

		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.storyID = params.get('storyid');
				console.log(this.storyID);
				this.articleID = params.get('articleid');

				if (this.articleID) {
					this.getStoryDetail(1, this.articleID, this.storyID);
				}else {
					this.getStoryDetail(0, null, this.storyID);
				}
			}
		);
	}
}
