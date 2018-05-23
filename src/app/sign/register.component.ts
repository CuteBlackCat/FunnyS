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

		const url = '/register';

		this.http.postConfig(url, params).subscribe(
			data => {
				console.log(data);
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
