import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { ResponseModel, GroupModel } from './responseModel';
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
	groups: GroupModel[] = new Array();
	info = 0;
	good = 0;
	warn = 0;
	error = 0;
	checked = false;
	@ViewChild('searchInput') searchInput: ElementRef;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.searchInput.nativeElement.focus();

		this.apiService.getURLs().subscribe(list => {
			this.groups = list;

			this.groups.forEach(group => {
				group.responses.forEach(item => {
					this.apiService.screenshot(item.responseUri).subscribe(x => {
						console.log(x);
						item.image = x.image;
					});
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

						if (item.statusCode >= 100 && item.statusCode < 200) {
							item.class = 'bg-info';
							this.info += 1;
						} else if (item.statusCode >= 200 && item.statusCode < 300) {
							item.class = 'bg-good';
							this.good += 1;
						} else if (item.statusCode >= 300 && item.statusCode < 500) {
							item.class = 'bg-warn';
							this.warn += 1;
						} else {
							item.class = 'bg-error';
							this.error += 1;
						}
					}, error => {
						console.log(error);
						item.loaded = true;
						item.statusCode = error.status;
						item.statusDescription = error.statusText;
						item.class = 'bg-error';
					});
				});
			});
		});
	}
}
