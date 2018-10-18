import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseModel } from './responseModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Health Check';
	responses: ResponseModel[] = new Array();

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.apiService.getURLs().subscribe(urls => {
			this.responses = urls;

			this.responses.forEach(item => {
				this.apiService.areYouAlive(item.responseUri).subscribe(x => {
					item.loaded = true;
					item.characterSet = x.characterSet;
					item.statusCode = x.statusCode;
					item.statusDescription = x.statusDescription;
					item.contentEncoding = x.contentEncoding;
					item.contentLength = x.contentLength;
					item.contentType = x.contentType;
					item.cookies = x.cookies;
					item.headers = x.headers;
					item.isMutuallyAuthenticated = x.isMutuallyAuthenticated;
					item.protocolVersion = x.protocolVersion;
					item.server = x.server;
					item.supportHeaders = x.supportHeaders;
					if (item.statusCode === 200) { item.class = 'bg-good'; } else { item.class = 'bg-warn'; }
				}, error => {
					console.log(error);
					item.loaded = true;
					item.statusCode = error.status;
					item.statusDescription = error.statusText;
					item.class = 'bg-warn';
				});
			});
		});
	}
}
