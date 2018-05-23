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
			username: 'ljx',
			password: 'ĸ1ĸ1ĸ1ĸ1ĸ1ĸ1ĸ1ĸ111',
			// 'password': this.http.md5(this.user.value.password, Math.trunc(Date.now() / 1000)),
			timestamp: Math.trunc(Date.now() / 1000)
		};

		const url = '/login';
		// const url = `login?username=${data.username}&password=${data.password}&timestamp=${data.timestamp}`;

		this.http.postConfig(url, data).subscribe(
			res => {
				if (res['code'] === 200) {
					this.info = '登录成功';
					this.local.setObject('user', res['data']);
					this.router.navigate([`/`]);
				} else {
					this.info = res['message'];
				}
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
	}

}
