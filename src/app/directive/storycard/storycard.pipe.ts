import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'interceptString' })
export class InterceptStringPipe implements PipeTransform {
	transform(value: string, length: number): string {
		// console.log(value);
		if (!value) {
			return '';
		}
		return value.slice(0, length)  + '...';
	}
}
