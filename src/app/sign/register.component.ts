import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ConfigService } from './sign.service';

@Component({
	selector: 'fs-register',
	templateUrl: './register.component.html',
	styleUrls: ['./sign.component.css']
	})
export class RegisterComponent implements OnInit {

	user: FormGroup;
	info: string;
	infoChange: boolean;

	constructor(
		private fb: FormBuilder,
		private http: ConfigService
	) { }

	onSubmit() {
		console.log(this.user.value);

		const params = {
			userName: this.user.value.username,
			userPwd: this.http.md5(this.user.value.password, String(Math.trunc(Date.now() / 1000))),
			userEmail: this.user.value.email,
			userPhoto: '',
			userDesription: ''
		};

		// const url = '/register';
		const url = `/register?userName=${params.userName}&userPwd=${params.userPwd}&userEmail=${params.userEmail}&userPhoto=""&userDesription=""`;

		this.http.postConfig(url, {}).subscribe(
			data => {
				if (data['code'] === '0') {
					this.info = '注册成功';
				} else {
					this.info = data['message'];
				}
				this.infoChange = !this.infoChange;
			},
			err => {
				this.info = '系统错误';
				this.infoChange = !this.infoChange;
			}
		);
	}



	ngOnInit() {

		this.user = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

}
