import { Pipe, PipeTransform } from '@angular/core';
import { ResponseModel } from './responseModel';

@Pipe({
	name: 'search'
})
export class SearchPipePipe implements PipeTransform {

	transform(value: ResponseModel[], searchterm: string): any {
		if (!searchterm) { return value; }
		var num = Number(searchterm);
		return value.filter(x => 
			x.server.includes(searchterm) || 
			x.name.includes(searchterm) ||
			x.responseUri.includes(searchterm) || 
			x.statusCode===num ||
			x.statusDescription.includes(searchterm)
		);
	}

}
