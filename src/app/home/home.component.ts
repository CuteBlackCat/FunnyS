import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	imgs: Array<object>;

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
	}

	select(href: string) {
		console.log(href);
	}

	ngOnInit() {
	}

}
