import { Injectable } from '@angular/core';

@Injectable()
export class GlobalService {

	constructor() {

	}
	/**
     * 数组方法
     */
	arrayFuc() {

		/**
		 * 移除某一项
		 */
		if (!Array.prototype['remove']) {
			Array.prototype['remove'] = function(value) {
				if (!this.includes(value)) {
					return;
				}

				const index = this.indexOf(value);

				this.splice(index, 1);
			};
		}

	}
}
