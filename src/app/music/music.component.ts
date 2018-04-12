import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { DomSanitizer  } from '@angular/platform-browser';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
	selector: 'fs-music',
	templateUrl: './music.component.html',
	styleUrls: ['./music.component.css', '../story/story.component.css']
})
export class MusicComponent implements OnInit, AfterViewInit {

	// 当前播放的音乐链接
	current_music: object;

	// 音乐类型
	types: Array<object>;

	// 当前音乐类型
	curType: string;

	// 是否播放中
	playing: boolean;

	// 播放顺序 0/1/2/3 顺序/循环/
	playorder: number;

	// audio的属性设置
	audio: object;

	// iframe节点
	@ViewChild('music') music: ElementRef;
	// 播放节点
	audioNode: any;

	constructor(
		private sanitizer: DomSanitizer,
		private router: Router,
		private route: ActivatedRoute
	) { }

	searchMusic(id: string) {
		this.curType = id;
		this.router.navigate([`/music/list/${id}`]);
	}

	/**
	 * 控制播放
	 * @param play 是否播放
	 */
	playMusic(play) {
		this.playing = play;
	}

	ngAfterViewInit() {

	}

	setAudioAttr(obj) {
		for (const prop of obj) {
			this.audioNode[prop] = obj[prop];
		}
	}

	ngOnInit() {
		const url = '//music.163.com/outchain/player?type=2&id=&auto=1&height=66';

		this.current_music = {
			songId: '432506345',
			singerName: '陈一发儿',
			songPicUrl: ''
		};

		this.playing = true;

		this.audioNode = this.music.nativeElement.querySelector('audio');

		this.audioNode.volume = 0.2;


		this.types = [
			{
				typeId: '0',
				typeName: '每日推荐'
			},
			{
				typeId: '1',
				typeName: '排行榜'
			},
			{
				typeId: '2',
				typeName: '最新音乐'
			},
			{
				typeId: '3',
				typeName: '最热音乐'
			},
			{
				typeId: '4',
				typeName: '飙升音乐'
			},
			{
				typeId: '5',
				typeName: '我喜欢的音乐'
			},
			{
				typeId: '6',
				typeName: '歌手'
			}
		];

		this.route.firstChild.paramMap.subscribe(
			(params: ParamMap) => {
				this.curType = params.get('id');
				console.log(this.curType );
			}
		);
	}

}
