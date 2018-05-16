import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MusicComponent } from './music/music.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AboutComponent } from './about/about.component';

const funnysRoutes: Routes = [
	{ path: 'home', component: HomeComponent},
	{ path: 'game', component: GamesComponent },
	{ path: 'about', component: AboutComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', component: PagenotfoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			funnysRoutes,
			{ enableTracing: false }
		)
	],
	exports: [
		RouterModule
	]
})

export class FunnysRoutingModule {}
