import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MusicService {

	baseUrl: string;

	constructor(
		private http: HttpClient
	) {
		this.baseUrl = 'http://localhost:1927';
	}

	getConfig(
		url: string,
		params: object
	) {
		console.log(url);
		return this.http.get(this.baseUrl + url, params);
	}

	postConfig(
		url: string,
		params: object
	) {
		return this.http.post(this.baseUrl + url, params);
	}

	md5(pwd, time) {
		time = String(time);
		pwd = String(pwd);

		let result = '';
		const maxLen = Math.max(time.length, pwd.length);

		for (let i = 0; i < maxLen; i++) {
			result += pwd[i] + time[i];
		}

		result = result.replace(/undefined/g, '');

		console.log(time);

		return result;
	}
}
