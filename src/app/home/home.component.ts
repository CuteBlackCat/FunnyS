import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	imgs: Array<object>;
	cards: object;
	gamecards: Array<object>;
	storycards: Array<object>;
	// hots: Array<object>;

	constructor() {
		this.imgs = [
			{
				src: 'assets/imgs/home/1.jpg',
				href: 'assets/imgs/home/1.jpg'
			},
			{
				src: 'assets/imgs/home/2.jpg',
				href: 'assets/imgs/home/2.jpg'
			},
			{
				src: 'assets/imgs/home/3.jpg',
				href: 'assets/imgs/home/3.jpg'
			},
			{
				src: 'assets/imgs/home/4.jpg',
				href: 'assets/imgs/home/4.jpg'
			},
			{
				src: 'assets/imgs/home/5.jpg',
				href: 'assets/imgs/home/5.jpg'
			},
		];

		const card = {
			img: 'assets/imgs/home/7.jpg',
			title: '最好听的影月就在Funnys',
			hot: 5000,
			collection: 4000,
			label: 'game',
			author: ' lijiaxin',
			type: 0,
			description: '像一颗海草海草哦海草海草随风飘摇，像一颗海草海草海草海草随风飘摇'
		};

		this.cards = [card, card, card, card, card];
		this.gamecards = [card, card, card, card, card, card, card, card, card, card];

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

		this.storycards = [story, story, story, story, story, story, story, story] ;
	}

	/**
	 * 选择图片上的消息
	 * @param href 所要跳转的链接
	 */
	select(href: string) {
		console.log(href);
	}

	/**
	 * 选择了card事件
	 * @param card 返回的card
	 */
	enterCard(card: object) {
		console.log(card);
	}

	ngOnInit() {
	}

}
