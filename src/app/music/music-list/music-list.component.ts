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

	@Input() next: number;
	@Input() playOrder: number;
	@Input() curType: string;
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
	}

	getMusicList(url) {
		this.http.getConfig(url, {}).subscribe(
			data => {

				this.page_id = 1;

				if ( this.curType === '0') {
					this.musicList = data['result'];
				}else if (this.curType === '1' || this.curType === '2' || this.curType === '3') {
					this.allMusic = data['playlist']['tracks'];
					this.maxLoad = this.allMusic.length / 20;
					this.musicList = data['playlist']['tracks'].slice(0, this.page_id * 20);
				}

				if (this.first) {
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
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				const musicid = params.get('musicid');
			}
		);

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
				url: ''
			},
			{
				typeId: '5',
				typeName: '歌手',
				url: '/toplist/artist'
			},
			{
				typeId: '6',
				typeName: '每日推荐',
				url: '/recommend/resource'
			}
		];

		this.curType = String(this.id);
		this.getMusicList(this.findUrl(this.id));

	}
}
