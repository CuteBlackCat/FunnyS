import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MusicService } from '../music.service';
@Component({
	selector: 'fs-music-play',
	templateUrl: './music-play.component.html',
	styleUrls: ['./music-play.component.css']
})
export class MusicPlayComponent implements OnInit, OnChanges {

	@Input() musicid: string;
	@Input() albumId: string;

	lyric: Array<string>;
	album: object;
	current_music: object;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: MusicService
	) {

	}

	getData(id) {
		this.http.getConfig('/lyric?id=' + id, {}).subscribe(
			data => {
				const lyric = data['lrc']['lyric'].replace(/[\[\d{2}:\d{2}.\d{2}]/g, '').replace(']', '');
				this.lyric = lyric.split('\n');
				for (let i = 0; i < this.lyric.length; i++) {
					this.lyric[i] = this.lyric[i].replace(']', '');
				}
			}
		);

		

		this.http.getConfig('/song/detail?ids=' + id, {}).subscribe(
			data => {
				this.current_music = data['songs'][0];
			}
		);
	}

	getAlbum(id) {
		this.http.getConfig('/album?id=' + id, {}).subscribe(
			data => {
				this.album = data['album'];
			}
		);
	}

	ngOnInit() {
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.musicid = params.get('musicid');
				this.getData(this.musicid);
			}
		);

		this.album = {
			blurPicUrl: ''
		};

		this.current_music = {
			id: '',
			name: '',
			ar: [
				{
					name: '',
				}
			],
			al: {
				pic: ''
			}
		};
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes.musicid && changes.musicid.previousValue !== changes.musicid.currentValue) {
			this.getData(changes.musicid.currentValue);
		}

		if (changes.albumId && changes.albumId.previousValue !== changes.albumId.currentValue) {
			this.getAlbum(changes.albumId.currentValue);
		}

	}
}
