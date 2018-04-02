import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BackcanvasComponent } from './canvas/backcanvas/backcanvas.component';
import { SnakeComponent } from './canvas/snake/snake.component';
import { TankComponent } from './canvas/tank/tank.component';

import { GlobalService } from './service/global.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GamesComponent } from './games/games.component';
import { MusicComponent } from './music/music.component';
import { StoryComponent } from './story/story.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';


@NgModule({
	declarations: [
	AppComponent,
	BackcanvasComponent,
	SnakeComponent,
	TankComponent,
	HomeComponent,
	LoginComponent,
	RegisterComponent,
	GamesComponent,
	MusicComponent,
	StoryComponent,
	PagenotfoundComponent
	],
	imports: [
	BrowserModule
	],
	providers: [{provide: GlobalService, useClass: GlobalService}],
	bootstrap: [AppComponent]
})
export class AppModule { }
