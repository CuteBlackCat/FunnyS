import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { LocalStorage } from './../service/local.storage';

@Component({
	selector: 'fs-login',
	templateUrl: './login.component.html',
	styleUrls: ['./sign.component.css']
})
export class LoginComponent implements OnInit {

	user: FormGroup;

	constructor(
		private local: LocalStorage,
		private fb: FormBuilder
	) { }

	onSubmit() {
		console.log(this.user.value);
	}

	ngOnInit() {
		let username = this.local.get('username');
		let password = this.local.get('password');

		username = username ? username : '';
		password = password ? password : '';


		// this.user = new FormGroup({
		// 	username: new FormControl(username, [Validators.required, Validators.minLength(3)]),
		// 	password: new FormControl(password, [Validators.required, Validators.minLength(6)])
		// });
		this.user = this.fb.group({
			username: [username, [Validators.required, Validators.minLength(3)]],
			password: [password, [Validators.required, Validators.minLength(6)]]
		});
	}

}
