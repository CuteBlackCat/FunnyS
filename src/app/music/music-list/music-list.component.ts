import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
	selector: 'fs-music-list',
	templateUrl: './music-list.component.html',
	styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit, OnChanges {

	id: number;

	musicList: Array<object>;
	curnext: number;
	curnum: number;

	@Input() next: number;
	@Input() playOrder: number;
	@Output() playSong = new EventEmitter<object>();

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

	}

	/**
	 * 播放音乐
	 * @param id 音乐ID
	 */
	playMusic(music, i) {
		console.log(music);
		this.curnext = i;
		this.playSong.emit(music);
		this.router.navigate([`/music/${this.id}`, {musicid: music.songId}]);
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
		if (changes.next.firstChange === false && this.curnext !== changes.next.currentValue) {
			const next = this.curnum < changes.next.currentValue ? true : false;
			this.curnum = changes.next.currentValue;
			this.curnext = this.selectMusic(next);
			this.playMusic(this.musicList[this.curnext], this.curnext);
		}
	}

	ngOnInit() {
		this.id = Number(this.route.snapshot.paramMap.get('id'));

		this.curnum = 0;
		this.curnext = 0;

		const musiTemp = {
			songId: '432506345',
			songTitle: '童话镇',
			singerName: '陈一发儿',
			songPicUrl: 'assets/imgs/music/1.jpg',
			love: true,
			time: '04:17'
		};

		this.musicList = [];

		let i = 0;
		while (i < 20) {
			i++;
			this.musicList.push({
				songId: '436514312',
				songTitle: '成都',
				singerName: '赵雷',
				songPicUrl: 'assets/imgs/music/1.jpg',
				love: true,
				time: '04:17'
			});
			this.musicList.push(musiTemp);
		}
	}
}
