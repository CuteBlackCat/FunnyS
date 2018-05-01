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

	// 播放顺序 0/1/2/3 顺序/循环/单曲/随机
	playorder: number;

	// audio的属性设置
	audio: object;

	// iframe节点
	@ViewChild('music') music: ElementRef;
	// 播放节点
	audioNode: any;

	// 播放定时器
	timer: any;

	// 播放条的长度
	audioWidth: number;

	// 1s在这个音乐中所占的比例
	oneSecond: number;

	// 当前音乐的时间
	allTime: number;

	// 当前播放的时间
	currentTime: number;

	// 时间进度条的宽度
	timeWidth: number;

	// 声音进度条的宽度
	volumnWidth: number;

	// 是否关闭声音
	closeVolume: boolean;

	// 关闭声音前的音量
	oldVolume: number;

	// 是否在列表页
	list: boolean;

	constructor(
		private sanitizer: DomSanitizer,
		private router: Router,
		private route: ActivatedRoute
	) { }

	searchMusic(id: string) {
		this.curType = id;
		this.router.navigate([`/music/${id}`, { playorder: this.playorder}]);
	}

	/**
	 * 控制播放
	 * @param play 是否播放
	 */
	playMusic(play) {
		console.log(play);
		this.playing = play;
		if (play && this.audioNode.paused) {
			this.audioNode.play();
			this.updateData();
		}else {
			this.audioNode.pause();
			clearTimeout(this.timer);
		}
	}

	ngAfterViewInit() {

	}

	setAudioAttr(obj) {
		for (const prop of obj) {
			this.audioNode[prop] = obj[prop];
		}
	}

	initData() {
		this.allTime = this.audioNode.duration,
		console.log(this.allTime);
		this.currentTime = this.audioNode.currentTime,
		this.timeWidth = 0;
		this.oneSecond = 1 / this.allTime;
		this.updateData();
	}

	updateData() {
		this.currentTime = this.audioNode.currentTime;
		this.timer = setTimeout(() => {
			this.timeWidth += this.oneSecond * this.audioWidth;
			this.updateData();
		}, 1000);
	}

	nextPlayMusic(click: boolean) {
		switch (this.playorder) {
			case 0:
				// 播放列表的下一首,当到最后一首结束
				break;
			case 1:
				// 播放列表的下一首,当到最后一首从第一首播放
				break;
			case 2:
				if (click) {
					// 播放下一首
				} else {
					// 播放当前位置
				}
				break;
			case 3:
				// 随机播放
		}
	}

	/**
	 * 切换播放模式
	 */
	switchPlayType() {
		this.playorder = this.playorder === 3 ? 0 : this.playorder + 1;
	}

	/**
	 * 移动进度条
	 * @param percent 所移动的百分比
	 */
	moveTime(percent) {
		clearTimeout(this.timer);
		this.timer = null;
		this.currentTime = this.allTime * percent;
		this.timeWidth = percent * this.audioWidth;
		this.audioNode.currentTime = this.currentTime;
		this.updateData();
	}

	/**
	 * 调节声音
	 * @param persent 百分比
	 */
	moveVolumn(persent) {
		this.oldVolume = persent;
		if (persent <= 0) {
			this.triggerVolume(true);
		} else {
			this.triggerVolume(false);
		}
	}

	/**
	 * 关闭声音
	 * @param close 是否静音
	 */
	triggerVolume(close) {
		this.closeVolume = close;
		if (close) {
			this.audioNode.volume = 0;
			this.volumnWidth = 0;
		}else {
			this.audioNode.volume = this.oldVolume;
			this.volumnWidth = this.oldVolume === 0 ? 105 : this.oldVolume * 105;
			console.log(this.volumnWidth);
		}
	}

	ngOnInit() {
		const url = '//music.163.com/outchain/player?type=2&id=&auto=1&height=66';

		this.current_music = {
			songId: '432506345',
			songTitle: '童话镇',
			singerName: '陈一发儿',
			songPicUrl: 'assets/imgs/music/1.jpg',
			love: true
		};

		this.playorder = 0;

		this.playing = true;

		this.audioNode = this.music.nativeElement.querySelector('audio');

		this.list = true;


		this.allTime = 0,
		this.currentTime = 0,
		this.timeWidth = 0;
		this.audioWidth = 630;

		this.volumnWidth = 105;
		this.oldVolume = 1;

		this.closeVolume = false;


		// 加载到可以播放
		this.audioNode.oncanplaythrough = () => {
			// 每次设置时间也会触发当前是否能播放
			if (!this.timeWidth) {
				this.initData();
				this.audioNode.play();
			}
		};

		// 歌曲播放完成
		this.audioNode.onended = () => {
			clearTimeout(this.timer);
			// 如何播放
			this.nextPlayMusic(false);
		};

		this.audio = {
			play: true,
			volume: 0.8,
			loop: false,
			currentTime: this.audioNode.currentTime,
		};

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

		this.route.paramMap.subscribe(
			(params: ParamMap) => {
				this.curType = params.get('id');
			}
		);
	}

}
