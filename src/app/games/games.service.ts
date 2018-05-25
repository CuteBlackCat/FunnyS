import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ConfigService {

	baseUrl: string;

	constructor(
		private http: HttpClient
	) {
		this.baseUrl = 'http://47.52.238.90:4396/funnys/rest/games';
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
		url = url.slice(0, url.length - 1);
		return this.http.post(this.baseUrl + url, {});
	}
}
