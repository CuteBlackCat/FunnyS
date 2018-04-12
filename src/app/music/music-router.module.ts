import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MusicComponent } from './music.component';

const router: Routes = [
	{ path: 'music', component: MusicComponent }
];

@NgModule({
	imports: [
		RouterModule.forChild(router)
	],
	exports: [
		RouterModule
	]
})
export class MusicRoutingModule {

}
