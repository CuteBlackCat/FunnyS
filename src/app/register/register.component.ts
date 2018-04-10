import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
	selector: 'fs-register',
	templateUrl: './register.component.html',
	styleUrls: ['../login/login.component.css']
	})
export class RegisterComponent implements OnInit {

	user: FormGroup;

	constructor(
		private fb: FormBuilder
	) { }

	onSubmit() {
		console.log(this.user.value);
	}

	ngOnInit() {

		this.user = this.fb.group({
			username: ['', [Validators.required, Validators.minLength(3)]],
			email: ['', [Validators.required, Validators.minLength(3)]],
			password: ['', [Validators.required, Validators.minLength(6)]]
		});
	}

}
