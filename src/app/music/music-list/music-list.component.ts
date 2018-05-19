import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MusicService } from '../music.service';
@Component({
	selector: 'fs-music-list',
	templateUrl: './music-list.component.html',
	styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit, OnChanges {

	id: number;

	types: Array<object>;

	musicList: Array<object>;
	curnext: number;
	curnum: number;

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
		this.router.navigate([`/music/${this.id}`, {musicid: music.id}]);
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

		if (changes.curType.previousValue !== changes.curType.currentValue) {
			this.getMusicList(this.findUrl(this.curType));
		}
	}

	getMusicList(url) {
		this.http.getConfig(url, {}).subscribe(
			data => {
				if ( this.curType === '0') {
					this.musicList = data['result'];
				}else if (this.curType === '1') {
					// this.musicList = data['playlist']['tracks'].slice(0, 50);
				}

				if (this.first) {
					this.playMusic(this.musicList[0], 0);
					this.first = false;
				}
			}
		);
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


		this.musicList = [];

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
