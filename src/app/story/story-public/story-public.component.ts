import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
@Component({
	selector: 'fs-story-public',
	templateUrl: './story-public.component.html',
	styleUrls: ['./story-public.component.css']
})

export class StoryLPublicComponent implements OnInit {

	types: Array<object>;

	length: number;

	curType: string;

	user: FormGroup;

	constructor(
		private router: Router,
		private fb: FormBuilder,
		private route: ActivatedRoute
	) {
		this.types = [
			{
				typeId: '1',
				typeName: '内涵段子'
			},
			{
				typeId: '2',
				typeName: '恐怖故事'
			},
			{
				typeId: '3',
				typeName: '伤感故事'
			},
			{
				typeId: '4',
				typeName: '爱情故事'
			},
			{
				typeId: '5',
				typeName: '其他故事'
			}
		];

		this.curType = this.types[0]['typeId'];

		this.length = 0;
	}

	onSubmit() {
		console.log(this.user);
	}

	selectType(id: string) {
		this.curType = id;
	}

	cacularLen() {
		setTimeout(() => {
			this.length = this.user.value.text.length;
		}, 0);
		
	}




	ngOnInit() {

		const text = '';
		this.user = this.fb.group({
			text: [text]
		});
	}
}
