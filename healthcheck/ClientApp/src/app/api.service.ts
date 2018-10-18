import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel } from './responseModel';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	baseUrl: string;
	responses: ResponseModel[] = new Array();

	constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
		this.baseUrl = baseUrl;
	}

	areYouAlive(URL: string): Observable<ResponseModel> {
		const headers = new HttpHeaders();
		return this.http.get(this.baseUrl + 'api/Alive/AreYouAlive?URL=' + URL, { headers: headers })
			.pipe(map((response: ResponseModel) => {
				return response;
			}));
	}

	getURLs(): Observable<Array<ResponseModel>> {
		return this.http.get('./assets/data.json').pipe(map((response: Array<string>) => {
			response.forEach(url => {
				const item = new ResponseModel;
				item.name = url[0];
				item.responseUri = url[1];
				this.responses.push(item);
			});
			return this.responses;
		}));
	}
}
