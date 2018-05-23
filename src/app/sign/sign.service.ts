import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

	baseUrl: string;

	constructor(
		private http: HttpClient
	) {
		this.baseUrl = 'http://47.52.238.90:4396/funnys/v1/';
	}

	getConfig(
		url: string,
		params: object
	) {
		return this.http.get(this.baseUrl + url, params);
	}

	postConfig(
		url: string,
		params: object
	) {
		return this.http.post(this.baseUrl + url, params);
	}

	md5(pwd, time) {
		let res = '';
		if (pwd.length >= 10) {

			for (let i = 0; i < 10; i++) {
				res += String.fromCharCode(pwd.charCodeAt(i) + 256);
				res += time.charAt(i);
			}
			for (let i = 10; i < pwd.length; i++) {
				res += String.fromCharCode(pwd.charCodeAt(i) + 256);
			}
		} else {
			for (let i = 0; i < pwd.length; i++) {
				res += String.fromCharCode(pwd.charCodeAt(i) + 256);
				res += time.charAt(i);
			}


			for (let i = pwd.length; i < 10; i++) {

				res += time.charAt(i);
			}
		}
		// time = String(time);
		// pwd = String(pwd);

		// let result = '';
		// const maxLen = Math.max(time.length, pwd.length);

		// for (let i = 0; i < maxLen; i++) {
		// 	console.log(pwd[i]);
		// 	const p = String(pwd[i]);
		// 	result += p.charCodeAt() + 256 + time[i];
		// }

		// result = result.replace(/undefined/g, '');

		// console.log(time);

		return res;
	}
}
