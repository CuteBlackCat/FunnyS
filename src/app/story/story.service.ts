import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

	baseUrl: string;

	constructor(
		private http: HttpClient
	) {
		this.baseUrl = 'http://47.52.238.90:4396/funnys/rest/novels';
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

	postUrlConfig(
		url: string,
		params: object
	) {
		url += '?';
		// tslint:disable-next-line:forin
		for (const prop in params) {
			url += `${prop}=${params[prop]}&`;
		}
		return this.http.post(this.baseUrl + url, {});
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
