import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { LocalStorage } from './../service/local.storage';
import { ConfigService } from './sign.service';

@Component({
	selector: 'fs-login',
	templateUrl: './login.component.html',
	styleUrls: ['./sign.component.css']
})
export class LoginComponent implements OnInit {

	user: FormGroup;
	info: string;
	infoChange: boolean;

	constructor(
		private local: LocalStorage,
		private fb: FormBuilder,
		private http: ConfigService,
		private router: Router
	) {

	}

	onSubmit() {
		console.log(this.user.value);
		const data = {
			username: this.user.value.username,
			// password: 'ĸ1ĸ1ĸ1ĸ1ĸ1ĸ1ĸ1ĸ111',
			password: this.http.md5(this.user.value.password, String(Math.trunc(Date.now() / 1000))),
			timestamp: Math.trunc(Date.now() / 1000)
		};

		// const url = '/login';
		const url = `login?username=${data.username}&password=${data.password}&timestamp=${data.timestamp}`;

		this.http.postConfig(url, {}).subscribe(
			res => {
				if (res['code'] === '0') {
					this.info = '登录成功';
					this.infoChange = !this.infoChange;
					this.local.setObject('user', res['data']);
					// this.router.navigate([``]);
				} else {
					this.info = res['message'];
				}
			},
			err => {
				this.info = '系统错误';
				this.infoChange = !this.infoChange;
			}
		);

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

		this.infoChange = false;
	}

}
