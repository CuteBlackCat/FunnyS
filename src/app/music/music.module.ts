import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MusicComponent } from './music.component';
import { MusicRoutingModule } from './music-router.module';

@NgModule({
	declarations: [
		MusicComponent,
	],
	imports: [
		BrowserModule,
		MusicRoutingModule
	],
	exports: [
		MusicComponent,
	]
})
export class MusicModule {
}
