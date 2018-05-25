import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MusicService } from '../music.service';
import { All } from '../../interface';
@Component({
	selector: 'fs-music-play',
	templateUrl: './music-play.component.html',
	styleUrls: ['./music-play.component.css']
})
export class MusicPlayComponent implements OnInit, OnChanges {

	@Input() musicid: string;
	@Input() albumId: string;

	lyric: Array<string>;
	album: All;
	current_music: All;
	lyricHeight: string;
	limit: number;
	offset: number;
	comment: All;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private http: MusicService
	) {
		this.lyricHeight = '210px';
		this.limit = 20;
		this.offset = 1;
	}

	getData(id) {
		if (!id) {
			return;
		}
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

	getComment(limit, id, offset) {
		if (offset < 1) {
			return;
		}
		if (this.comment && this.comment['total'] / this.limit < offset) {
			return;
		}
		this.offset = offset;
		this.http.getConfig(`/comment/music?id=${id}&limit=${limit}&offset=${offset}`, {}).subscribe(
			data => {
				this.comment = data;
			}
		);
	}

	getAlbum(id) {
		if (!id) {
			return;
		}
		this.http.getConfig('/album?id=' + id, {}).subscribe(
			data => {
				this.album = data['album'];
			}
		);
	}

	likedComment(liked, item) {
		this.http.getConfig(`/comment/like?id=${this.current_music['id']}&cid=${item.commentId}&t=${liked}&type=0`, {}).subscribe(
			data => {
				item.liked = liked === 1 ? true : false;
				item.likedCount = liked === 1 ? item.likedCount + 1 : item.likedCount - 1;
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
			this.getComment(this.limit, changes.musicid.currentValue, this.offset);
		}

		if (changes.albumId && changes.albumId.previousValue !== changes.albumId.currentValue) {
			console.log(changes.albumId.currentValue);
			this.getAlbum(changes.albumId.currentValue);
		}

	}
}
