import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-games-list',
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

	games: Array<object>;

	constructor() { }

	ngOnInit() {
		this.games = [
			{
				img: 'http://p1.music.126.net/cCyPSxi-BE2h-SmpLBztbA==/18635622580993683.jpg',
				title: '坦克大战',
				hot: 0,
				collection: 0,
				label: '游戏',
				author: 'funnys',
				type: 4, // 音乐 1 ablum 2 故事 3 游戏 4
				description: '一款经典的游戏',
				route: 'tank'
			},
			{
				img: 'http://p1.music.126.net/cCyPSxi-BE2h-SmpLBztbA==/18635622580993683.jpg',
				title: '贪吃蛇大作战',
				hot: 0,
				collection: 0,
				label: '游戏',
				author: 'funnys',
				type: 4, // 音乐 1 ablum 2 故事 3 游戏 4
				description: '贪吃蛇噢',
				route: 'snake'
			}
		];
	}

}
