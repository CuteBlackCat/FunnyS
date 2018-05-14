import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
@Component({
	selector: 'fs-music-play',
	templateUrl: './music-play.component.html',
	styleUrls: ['./music-play.component.css']
})
export class MusicPlayComponent implements OnInit, OnChanges {

	@Input() musicid: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router
	) {

	}

	getData(id) {
		console.log(id);
	}

	ngOnInit() {
		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.musicid = params.get('musicid');
			}
		);
	}

	ngOnChanges(changes: SimpleChanges) {
		this.getData(changes.musicid.currentValue);
	}
}
