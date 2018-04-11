import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

@NgModule({
	declarations: [
		LoginComponent,
		RegisterComponent
	],
	imports: [
		BrowserModule
	],
	exports: [
		LoginComponent, RegisterComponent
	]
})
export class SignModule {

}
