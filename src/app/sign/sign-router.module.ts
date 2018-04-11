import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

const router: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(router)
	],
	exports: [RouterModule]
})
export class SignRouterModule {

}
