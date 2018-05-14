import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { SignRouterModule } from './sign-router.module';

import { ConfigService } from './sign.service';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		SignRouterModule,
		ReactiveFormsModule
	],
	exports: [
		LoginComponent, RegisterComponent
	],
	providers: [{provide: ConfigService, useClass: ConfigService}]
})
export class SignModule {

}
