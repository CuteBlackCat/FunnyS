import { Component, OnInit, Input } from '@angular/core';
@Component({
	selector: 'fs-music-songer',
	templateUrl: './music-songer.component.html',
	styleUrls: ['./music-songer.component.css']
})
export class MusicSongerComponent implements OnInit {

	@Input() songer: object;

	ngOnInit() {

	}
}
