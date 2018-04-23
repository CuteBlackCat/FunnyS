import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'fs-music-list',
	templateUrl: './music-list.component.html',
	styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit {

	id: number;

	musicList: Array<object>;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

	}

	/**
	 * 播放音乐
	 * @param id 音乐ID
	 */
	playMusic(id) {
		this.router.navigate([`/music/${this.id}`, {musicid: id}]);
	}

	ngOnInit() {
		this.id = Number(this.route.snapshot.paramMap.get('id'));

		this.musicList = {}
	}
}
