import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'fs-games-list',
	templateUrl: './games-list.component.html',
	styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

	games: Array<object>;

	constructor(
		private router: Router
	) { }

	selectGames(card) {
		const route = card['route'];

		this.router.navigate([`/game/${route}`]);

	}

	ngOnInit() {
		this.games = [
			{
				img: 'assets/imgs/game/tank.png',
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
				img: 'assets/imgs/game/snake.jpg',
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
