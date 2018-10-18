import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseModel, GroupModel } from './responseModel';

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	baseUrl: string;
	groups: GroupModel[] = new Array();

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

	getURLs(): Observable<Array<GroupModel>> {
		return this.http.get('./assets/data.json').pipe(map((list: any) => {
			list.forEach(g => {
				const resp = new GroupModel();
				resp.name = g[0];
				g[1].forEach(url => {
					const item = new ResponseModel;
					item.name = url[0];
					item.responseUri = url[1];
					resp.responses.push(item);
				});
				this.groups.push(resp);
			});
			return this.groups;
		}));
	}
}
