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
			title: '敬请期待',
			hot: 5000,
			collection: 4000,
			label: 'game',
			author: ' funnys',
			type: -1, //
			description: '更多好玩的游戏正在开发中...'
		};

		// this.cards = [card, card, card, card, card];
		this.gamecards = [{
				img: 'assets/imgs/game/tank.png',
				title: '坦克大战',
				hot: 0,
				collection: 0,
				label: '游戏',
				author: 'funnys',
				type: 3, // 音乐 1 ablum 2 故事 3 游戏 4
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
				type: 3, // 0 音乐 1 ablum 2 故事 3 游戏
				description: '贪吃蛇噢',
				route: 'snake'
			}, card, card, card];

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
	enterMusicCard(card: object) {
		console.log(card);
		if (card['type'] === 0) {
			this.router.navigate(['/music/7', { music: card['title'] }]);
		} else if (card['type'] === 1) {
			this.router.navigate(['/music/7', { album: card['id'] }]);
		} else if (card['type'] === 4) {

		}
	}

	enterStoryCard(card: object) {
		this.router.navigate(['/story/detail', { storyid: card['storyID'] }]);
	}

	enterGameCard(card: object) {
		this.router.navigate([`/game/${card['route']}`]);
	}

	enterWonderCard(card: object) {
		if (card['type'] === -1) {
			return;
		}
		if (card['type'] === 0 || card['type'] === 1) {
			this.enterMusicCard(card);
		} else if (card['type'] === 2) {
			this.enterStoryCard(card);
		} else if (card['type'] === 3) {
			this.enterGameCard(card);
		}
	}

	getConfig(
		url: string,
		params: object
	) {
		// console.log(url);
		return this.http.get(url, params);
	}

	postConfig(
		url: string,
		params: object
	) {
		// console.log(url);
		return this.http.post(url, params);
	}

	ngOnInit() {
		this.storycards = [];
		this.musicCards = [];
		this.wonderCards = [
			{
				img: 'http://p1.music.126.net/cCyPSxi-BE2h-SmpLBztbA==/18635622580993683.jpg',
				title: '纸短情长',
				hot: 206017,
				collection: 14982,
				label: 'music',
				author: '花粥',
				type: 0, // 音乐 1 ablum 2 故事 3 游戏
				description: '某音很火的歌'
			},
			{
				img: 'http://p3.music.126.net/ULlwJ2drOfYv-f6-_7jGGQ==/3250156379592966.jpg',
				title: '薛之谦',
				hot: 113023,
				collection: 23132,
				label: 'music',
				author: '薛之谦',
				type: 0, // 音乐
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
							type: 1, // 专辑
							description: item.description
					};
					this.musicCards.push(obj);
				});
			}
		);

		this.postConfig('http://47.52.238.90:4396/funnys/rest/novels/get_novel_base_info?novelType=&type=1', {})
			.subscribe(
				res => {
					this.storycards = res['data'].slice(0, 10);
				}
			);
	}

}
