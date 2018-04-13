import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'tosecond'})
export class ToSecondPipe implements PipeTransform {
	transform(value: string): string {
		const intValue = Number(value);

		const munite = Math.trunc(intValue / 60);

		const second = Math.trunc(intValue - munite * 60);

		return (munite >= 10 ? `${munite}` : '0' + munite) + ':' + (second >= 10 ? `${second}` : '0' + second);
	}
}
