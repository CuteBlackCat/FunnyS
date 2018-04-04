import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	imgs: Array<object>;
	cards: object;
	a:any;
	gamecards: Array<object>;
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
			type: 0
		};

		this.cards = [card, card, card, card, card];
		this.gamecards = [card, card, card, card, card, card, card, card, card, card];
		// const hot = {
		// 	icon: '&#xe668;',
		// 	title: '坦克大战',
		// 	description: '带你回忆游戏童年',
		// 	href: '../'
		// };

		// this.hots = [hot, hot, hot, hot];
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
