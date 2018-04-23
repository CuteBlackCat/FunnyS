import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { MusicComponent } from './music.component';
import { MusicListComponent } from './music-list/music-list.component';
import { MusicPlayComponent } from './music-play/music-play.component';
import { MusicCommentComponent } from './music-comment/music-comment.component';
import { MusicSongerComponent } from './music-songer/music-songer.component';

const router: Routes = [
	{
		path: 'music/:id',
		component: MusicComponent,
		children: [
			// {
			// 	path: '',
			// 	redirectTo: 'list/0',
			// 	pathMatch: 'full'
			// },
			// {
			// 	path: 'list/:id',
			// 	component: MusicListComponent
			// },
			{
				path: 'play',
				component: MusicPlayComponent,
				children: [
					{
						path: 'comment/:id',
						component: MusicCommentComponent
					}
				]
			},
			{
				path: 'songer',
				component: MusicSongerComponent
			}
		]
	},
	{
		path: 'music',
		redirectTo: 'music/0',
		pathMatch: 'full'
	}
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
