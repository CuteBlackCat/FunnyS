import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

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
	wonderCards: Array<object>;
	musicCards: Array<object>;
	// hots: Array<object>;

	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.imgs = [
			{
				type: 'music',
				src: 'http://p1.music.126.net/oR6GTqWl3_fSmWcs6IBJSA==/109951163312267247.jpg',
				href: '/music/7;562594265'
			},
			{
				type: 'music',
				src: 'http://p1.music.126.net/XGBzYhIJrJbKZpg1Fp7hSg==/109951163312275830.jpg',
				href: '/music/7;562592443'
			},
			{
				type: 'story',
				src: 'assets/imgs/home/8.jpg',
				href: '/story/list'
			},
			{
				type: 'music',
				src: 'http://p1.music.126.net/UO5gvUIk9RZL78u5ZsoIBA==/109951163312707065.jpg',
				href: '/music/7;562594267'
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
	select(img: object) {
		if (img['type'] === 'music') {
			const musicid = (img['href'].split(';'))[1];
			this.router.navigate(['/music/7', {musicid: musicid}]);
		} else if (img['type'] === 'story') {
			this.router.navigate([img['href']]);
		}
	}

	/**
	 * 选择了card事件
	 * @param card 返回的card
	 */
	enterCard(card: object) {
		console.log(card);
	}

	getConfig(
		url: string,
		params: object
	) {
		console.log(url);
		return this.http.get(url, params);
	}

	ngOnInit() {
		this.musicCards = [];
		this.wonderCards = [
			{
				img: 'http://p1.music.126.net/cCyPSxi-BE2h-SmpLBztbA==/18635622580993683.jpg',
				title: '纸短情长',
				hot: 206017,
				collection: 14982,
				label: 'music',
				author: '花粥',
				type: 0,
				description: '某音很火的歌'
			},
			{
				img: 'http://p3.music.126.net/ULlwJ2drOfYv-f6-_7jGGQ==/3250156379592966.jpg',
				title: '薛之谦',
				hot: 113023,
				collection: 23132,
				label: 'music',
				author: '薛之谦',
				type: 0,
				description: '热门歌手'
			},
			{
				img: 'http://p1.music.126.net/VY-LfiQZZNjtDBHGmEu85A==/109951163300149472.jpg',
				title: '往后余生',
				hot: 98120,
				collection: 19702,
				label: 'music',
				author: '马良',
				type: 0,
				description: '新歌top one'
			},
			{
				img: 'http://p1.music.126.net/cCyPSxi-BE2h-SmpLBztbA==/18635622580993683.jpg',
				title: 'PLANET',
				hot: 95413,
				collection: 31233,
				label: 'music',
				author: 'ラムジ',
				type: 0,
				description: '又一抖音神曲'
			},
			{
				img: 'http://p3.music.126.net/o-FjCrUlhyFC96xiVvJZ8g==/109951163111191410.jpg',
				title: '周杰伦',
				hot: 1230121,
				collection: 322312,
				label: 'music',
				author: '周杰伦',
				type: 0,
				description: '歌神top1'
			}
		];

		this.getConfig('http://localhost:1927/top/playlist/highquality?limit=10', {}).subscribe(
			res => {
				res['playlists'].forEach((item, i) => {
					const obj = {
							img: item.coverImgUrl,
							title: item.name,
							id: item.id,
							hot: item.playCount,
							collection: item.subscribedCount,
							label: item.tag,
							author: item.creator.nickname,
							type: 1,
							description: item.description
					};
					this.musicCards.push(obj);
				});
			}
		);
	}

}
