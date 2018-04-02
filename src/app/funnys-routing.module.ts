import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MusicComponent } from './music/music.component';
import { GamesComponent } from './games/games.component';
import { HomeComponent } from './home/home.component';
import { StoryComponent } from './story/story.component';
import { RegisterComponent } from './register/register.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const funnysRoutes: Routes = [
	{ path: 'home', component: HomeComponent},
	{ path: 'game', component: GamesComponent },
	{ path: 'music', component: MusicComponent },
	{ path: 'story', component: StoryComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{ path: '**', component: PagenotfoundComponent }
];

@NgModule({
	imports: [
		RouterModule.forRoot(
			funnysRoutes,
			{ enableTracing: true }
		)
	],
	exports: [
		RouterModule
	]
})

export class FunnysRoutingModule {}
