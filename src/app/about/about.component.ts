import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'fs-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
	front_end: object;
	back_end: object;
	introduction: Array<string>;
	links: Array<object>;
	front_info: Array<object>;
	back_info: Array<object>;

	constructor() {

	}

	ngOnInit() {
		this.front_end = {
			src: 'assets/imgs/engineer/front_end1.png',
			name: '李嘉欣',
			title: '前端开发工程师',
			content: '一年开发经验，现就职于某游戏公司，任前端开发一职，热爱技术、热爱生活,有着丰富的前端知识结构。熟练javascript、HTML5、CSS3、canvas、Angular2.0、git、ECMAscript6'
		};
		this.back_end = {
			src: 'assets/imgs/engineer/back_end1.jpg',
			name: '吴星昊',
			title: '后端开发工程师',
			content: '本人男，爱好美女。会玩点游戏，会敲点代码，会打点桌球 ... 希望成为一个技术大牛.重点是爱好美女，重点是爱好美女，重点是爱好美女！'
		};
		this.introduction = [
			'Funnys是一款集成游戏、音乐、故事接龙等一系列娱乐项目的web网站，此网站不同于某一款APP，用户可以在网站上不用切换网址浏览自己需要的娱乐项目，并能够像应用程序一样下载到本地桌面，而不占内存。',
			'Funnys的开发团队由两个年轻的小伙子组成，其中一个很帅，前端技术栈为Angular、TypeScript、CSS3、HTML、Canvas、Proceil(或webpack)，后端未知.......'
		];

		this.links = [
			{
				name: 'Google',
				href: 'http://www.google.com/',
				background: '#4285f4'
			},
			{
				name: 'Iconfont',
				href: 'http://www.iconfont.cn/',
				background: '#ea4335'
			},
			{
				name: '慕课网',
				href: 'https://www.imooc.com/',
				background: '#fbbc05'
			},
			{
				name: 'Github',
				href: 'https://github.com/',
				background: '#34a853'
			},
			{
				name: 'segmentfault',
				href: 'https://segmentfault.com/',
				background: '#ea4335'
			}
		];

		this.front_info = [
			{
				name: 'phone',
				address: '18796000256'
			},
			{
				name: 'github',
				address: 'https://github.com/CuteBlackCat'
			},
			{
				name: 'blog',
				address: 'https://cuteblackcat.github.io/'
			},
			{
				name: 'email',
				address: 'cuteblackcat9@gmail.com'
			}
		];

		this.back_info = [
			{
				name: 'phone',
				address: '18796000256'
			},
			{
				name: 'github',
				address: 'https://github.com/Just2017'
			},
			{
				name: '单身？',
				address: '是的，在找对象'
			}
		];
	}
}

