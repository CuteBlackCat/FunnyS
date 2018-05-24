import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from '../story.service';
import { LocalStorage } from '../../service/local.storage';
@Component({
	selector: 'fs-story-public',
	templateUrl: './story-public.component.html',
	styleUrls: ['./story-public.component.css']
})

export class StoryLPublicComponent implements OnInit {

	types: Array<string>;

	length: number;

	curType: number;

	user: FormGroup;
	story: FormGroup;

	title: string;

	info: string;

	oldType: number;

	userInfo: object;

	loading: boolean;

	changeInfo: boolean;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private http: ConfigService,
		private local: LocalStorage
	) {
		this.userInfo = this.local.getObject('user');
	}

	onSubmit() {
		const type = this.curType === null ? this.user.value.type : this.types[this.curType];

		if (!this.userInfo['token']) {
			this.info = '客观，请先登录噢！';
			this.changeInfo = !this.changeInfo;
			return;
		}
		this.loading = true;
		this.http.postConfig(`/updateArticleTitle?title=${this.user.value.title}&storyType=${type}&storyIntro=${this.user.value.text}&create_userID=${this.userInfo['userId']}`, {
			// title: this.user.value.title,
			// storyType: type,
			// storyIntro: this.user.value.text,
			// create_userID: 'dbacd51340b029fa20da036cb444e056'
		}).subscribe(
			res => {
				if (res['code'] === '0') {
					this.info = '发布成功';

					this.user.reset({
						title: '',
						text: ''
					});

					this.getStoryTypes();
				}else {
					this.info = res['message'];
				}
				this.changeInfo = !this.changeInfo;
				this.loading = false;
			}
		);
	}

	selectType(id: number) {
		this.curType = id;
		this.oldType = id;
		this.user.setValue({type: ''});
	}

	cacularLen() {
		setTimeout(() => {
			this.length = this.user.value.text.length;
		}, 0);
	}

	autoType() {
		setTimeout(() => {
			if (this.user.value.type === '') {
				this.curType = this.oldType;
			}else {
				this.curType = null;
			}
		}, 0);
	}

	getStoryTypes() {
		this.http.getConfig('/get_novel_type', {}).subscribe(
			data => {
				console.log(data);
				this.types = data['data'];
				this.curType = this.oldType;
			}
		);
	}

	ngOnInit() {
		this.getStoryTypes();

		this.title = '';

		this.curType = 0;

		this.oldType = this.curType;

		this.length = 0;

		const text = ''; const title = '';
		this.user = this.fb.group({
			text: [text],
			title: [title],
			type: ''
		});
	}
}
