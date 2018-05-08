import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'fs-music-play',
	templateUrl: './music-play.component.html',
	styleUrls: ['./music-play.component.css']
})
export class MusicPlayComponent implements OnInit {

	musicid: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

	}

	ngOnInit() {
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.musicid = params.get('musicid');
			}
		);
	}
}
