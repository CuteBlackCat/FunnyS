import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import { ConfigService } from '../story.service';
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

	oldType: number;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute,
		private http: ConfigService
	) {
		this.types = ['玄幻', '武侠', '幽默', '爱情', '恐怖'];

		this.title = '';

		this.curType = 0;

		this.oldType = this.curType;

		this.length = 0;
	}

	onSubmit() {
		const type = this.curType === null ? this.user.value.type : this.types[this.curType];
		console.log(this.user);
		this.http.postConfig(`/updateArticleTitle?title=${this.user.value.title}&storyType=${type}&storyIntro=${this.user.value.text}&create_userID=dbacd51340b029fa20da036cb444e056`, {
			// title: this.user.value.title,
			// storyType: type,
			// storyIntro: this.user.value.text,
			// create_userID: 'dbacd51340b029fa20da036cb444e056'
		}).subscribe(
			res => {
				console.log(res);
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




	ngOnInit() {

		const text = ''; const title = '';
		this.user = this.fb.group({
			text: [text],
			title: [title],
			type: ''
		});
	}
}
