import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MusicRoutingModule } from './music-router.module';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicPlayComponent } from './music-play/music-play.component';
import { MusicCommentComponent } from './music-comment/music-comment.component';
import { MusicSongerComponent } from './music-songer/music-songer.component';

@NgModule({
	declarations: [
		MusicComponent,
		MusicListComponent,
		MusicPlayComponent,
		MusicCommentComponent,
		MusicSongerComponent
	],
	imports: [
		BrowserModule,
		MusicRoutingModule
	],
	exports: [
		MusicComponent,
		MusicListComponent,
		MusicPlayComponent,
		MusicCommentComponent,
		MusicSongerComponent
	]
})
export class MusicModule {
}
