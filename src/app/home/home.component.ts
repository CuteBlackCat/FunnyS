import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	imgs: Array<object>;
	card: object;

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

		this.card = {
			img: 'assets/imgs/home/5.jpg',
			title: '最好听的影月就在Funnys',
			hot: 5000,
			collection: 4000,
			label: ['game', 'music']
		};
	}

	/**
	 * 选择图片上的消息
	 * @param href 所要跳转的链接
	 */
	select(href: string) {
		console.log(href);
	}

	enterCard(card: object) {
		console.log(card);
	}

	ngOnInit() {
	}

}
