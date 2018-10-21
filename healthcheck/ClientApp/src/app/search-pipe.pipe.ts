import { Pipe, PipeTransform } from '@angular/core';
import { ResponseModel } from './responseModel';

@Pipe({
	name: 'search'
})
export class SearchPipePipe implements PipeTransform {

	transform(value: ResponseModel[], searchterm: string): any {
		if (!searchterm) { return value; }
		const num = Number(searchterm);
		return value.filter(x =>
			this.tryStringNull(x.name).toLowerCase().includes(searchterm) ||
			this.tryStringNull(x.responseUri).toLowerCase().includes(searchterm) ||
			x.statusCode === num ||
			this.tryStringNull(x.statusDescription).toLowerCase().includes(searchterm)
		);
	}

	tryStringNull(value: string) {
		if (!value) { return ''; }
		return value;
	}
}
