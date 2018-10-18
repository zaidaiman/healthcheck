import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { SearchPipePipe } from './search-pipe.pipe';

@NgModule({
	declarations: [
		AppComponent,
		SearchPipePipe
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
