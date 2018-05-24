import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MusicService } from '../music.service';
@Component({
	selector: 'fs-music-list',
	templateUrl: './music-list.component.html',
	styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit, OnChanges {

	id: number;

	page_id: number;

	allMusic: Array<object>;

	types: Array<object>;

	musicList: Array<object>;
	curnext: number;
	curnum: number;

	maxLoad: number;

	first: boolean;

	topTen: Array<object>;

	hotSonger: Array<object>;

	search: boolean;
	album: boolean;

	@Input() next: number;
	@Input() playOrder: number;
	@Input() curType: string;
	@Input() keyWords: string;
	@Output() playSong = new EventEmitter<object>();

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: MusicService
	) {

	}

	/**
	 * 播放音乐
	 * @param id 音乐ID
	 */
	playMusic(music, i) {
		this.curnext = i;
		if (music['album']) {
			music['pic'] = music['album']['picUrl'];
		} else if (music['al']) {
			music['pic'] = music['al']['picUrl'];
		}
		this.playSong.emit(music);
		this.router.navigate([`/music/${this.curType}`, {musicid: music.id}]);
	}

	selectMusic(next) {
		if (this.playOrder === 3) {
			const num = Math.random() * this.musicList.length;
			if (num === this.curnext) {
				this.selectMusic(next);
			}else {
				this.curnext = num;
				return this.curnext;
			}
		}else {
			return next ? this.curnext + 1 : this.curnext - 1;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		console.log(changes);
		if (changes.next && changes.next.firstChange === false && this.curnext !== changes.next.currentValue) {
			const next = this.curnum < changes.next.currentValue ? true : false;
			this.curnum = changes.next.currentValue;
			this.curnext = this.selectMusic(next);
			this.playMusic(this.musicList[this.curnext], this.curnext);
		}

		if (changes.curType && changes.curType.previousValue !== changes.curType.currentValue) {
			this.getMusicList(this.findUrl(this.curType));
		}

		if (changes.keyWords && changes.keyWords.previousValue !== changes.keyWords.currentValue) {
			this.keyWords = changes.keyWords.currentValue;
		}
	}

	songerMusic(id) {
		this.curType = '7';
		this.search = false;
		this.getMusicList(`/artists?id=${id}`);
		this.router.navigate([`/music/7`]);
	}

	getMusicList(url) {
		console.log(url);
		this.http.getConfig(url, {}).subscribe(
			data => {

				this.page_id = 1;

				let canPlay = false;

				if ( this.curType === '0') {
					this.musicList = data['result'];
					canPlay = true;
				}else if (this.curType === '1' || this.curType === '2' || this.curType === '3') {
					this.allMusic = data['playlist']['tracks'];
					this.maxLoad = this.allMusic.length / 20;
					this.musicList = data['playlist']['tracks'].slice(0, this.page_id * 20);
					canPlay = true;
				}else if (this.curType === '4') {
					console.log(data);
					const playlistId = data['playlist'][0]['id'];
					this.http.getConfig(`/playlist/detail?id=${playlistId}`, {}).subscribe(
						res => {
							console.log(res);
							this.allMusic = res['result']['tracks'];
							this.maxLoad = this.allMusic.length / 20;
							this.musicList = res['result']['tracks'].slice(0, this.page_id * 20);
							if (this.first) {
								this.playMusic(this.musicList[0], 0);
								this.first = false;
							}
						}
					);
				}else if (this.curType === '6') {
					this.allMusic = data['recommend'];
					this.maxLoad = this.allMusic.length / 20;
					this.musicList = data['recommend'].slice(0, this.page_id * 20);
					canPlay = true;
				}else if (this.curType === '5') {
					this.topTen = data['artists'].slice(0, 10);
					this.hotSonger = data['artists'].slice(10);
				}else if (this.curType === '7') {
					console.log(data);
					if (this.album) {
						this.album = false;
						this.allMusic = data['result']['tracks'];
						this.maxLoad = this.allMusic.length / 20;
						this.musicList = data['result']['tracks'].slice(0, this.page_id * 20);
					}else {
						this.allMusic = this.search ? data['result']['songs'] : data['hotSongs'];
						this.maxLoad = this.allMusic.length / 20;
						this.musicList = this.allMusic.slice(0, this.page_id * 20);
					}
					canPlay = true;
				}

				if (this.first && canPlay) {
					this.playMusic(this.musicList[0], 0);
					this.first = false;
				}
			}
		);
	}

	loadMore() {
		const newMusic = this.allMusic.slice(this.page_id * 20, (this.page_id + 1) * 20);
		this.musicList = this.musicList.concat(newMusic);
		this.page_id++;
	}

	findUrl(id) {
		let result = '';
		for (let i = 0; i < this.types.length; i++) {
			if (this.types[i]['typeId'] === String(id)) {
				result = this.types[i]['url'];
				break;
			}
		}
		console.log(result);
		return result;
	}

	ngOnInit() {
		this.id = Number(this.route.snapshot.paramMap.get('id'));

		this.curnum = 0;
		this.curnext = 0;

		this.first = true;

		this.page_id = 1;


		this.musicList = [];

		this.allMusic = [];

		this.maxLoad = 1;

		this.types = [
			{
				typeId: '0',
				typeName: '排行榜',
				url: '/personalized/newsong'
			},
			{
				typeId: '1',
				typeName: '最新音乐',
				url: '/top/list?idx=0'
			},
			{
				typeId: '2',
				typeName: '最热音乐',
				url: '/top/list?idx=1'
			},
			{
				typeId: '3',
				typeName: '飙升音乐',
				url: '/top/list?idx=3'
			},
			{
				typeId: '4',
				typeName: '我喜欢的音乐',
				url: '/user/playlist?uid=408651069'
			},
			{
				typeId: '5',
				typeName: '歌手',
				url: '/top/artists'
			},
			{
				typeId: '6',
				typeName: '每日推荐',
				url: '/recommend/songs'
			}, {
				typeId: '7',
				typeName: '搜索列表',
				url: ''
			}
		];

		this.curType = String(this.id);

		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				const music = params.get('music');
				const album = params.get('album');

				if (music && this.curType === '7') {
					this.search = true;
					this.getMusicList(`/search?keywords=${music}`);
				} else if (album && this.curType === '7') {
					this.album = true;
					this.search = true;
					this.getMusicList(`/playlist/detail?id=${album}`);
				}else if (!music && !album) {
					return;
				}else {
					this.getMusicList(this.findUrl(this.id));
				}
			}
		);

		// this.getMusicList(this.findUrl(this.id));

		window.addEventListener('keyup', e => {
			if (e.keyCode === 13 && this.keyWords !== '') {
				this.curType = '7';
				this.search = true;
				this.getMusicList(`/search?keywords=${this.keyWords}`);
				this.router.navigate([`/music/7`]);
			}
		});

	}
}
