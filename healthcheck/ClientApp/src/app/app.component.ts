import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { GroupModel } from './responseModel';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	title = 'Health Check';
	groups: GroupModel[] = new Array();
	info = 0;
	good = 0;
	warn = 0;
	error = 0;
	checked = false;
	bufferValue = 0;
	counter = 0;
	total = 0;

	@ViewChild('searchInput') searchInput: ElementRef;

	constructor(private apiService: ApiService) { }

	ngOnInit() {
		this.searchInput.nativeElement.focus();

		this.apiService.getURLs().subscribe(list => {
			this.groups = list;
			this.total = 0;
			this.counter = 0;
			this.bufferValue = 0;

			this.groups.forEach(group => {
				this.total += group.responses.length;

				group.responses.forEach(item => {
					item.image = './assets/placeholder.png';
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
						item.createdDateTime = x.createdDateTime;

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

					this.apiService.screenshot(item.responseUri).subscribe(x => {
						item.image = 'data:image/png;base64,' + x.image;
						this.counter += 1;
						this.bufferValue = (this.counter / this.total) * 100;
					});
				});
			});
		});
	}
}
