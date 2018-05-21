import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicRoutingModule } from './music-router.module';
import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicPlayComponent } from './music-play/music-play.component';
import { MusicCommentComponent } from './music-comment/music-comment.component';
import { MusicSongerComponent } from './music-songer/music-songer.component';
import { FsDirectiveModule } from '../directive/directive.module';
import { ToSecondPipe } from './music.pipe';

import { MusicService } from './music.service';

@NgModule({
	declarations: [
		MusicComponent,
		MusicListComponent,
		MusicPlayComponent,
		MusicCommentComponent,
		MusicSongerComponent,
		ToSecondPipe
	],
	imports: [
		BrowserModule,
		FormsModule,
		MusicRoutingModule,
		FsDirectiveModule
	],
	exports: [
		MusicComponent,
		MusicListComponent,
		MusicPlayComponent,
		MusicCommentComponent,
		MusicSongerComponent,
		ToSecondPipe
	],
	providers: [{ provide: MusicService, useClass: MusicService}]
})
export class MusicModule {
}
