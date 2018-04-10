// 导入核心模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';

// 导入自定义模块
import { FsDirectiveModule } from './directive/directive.module';
import { FunnysRoutingModule } from './funnys-routing.module';
import { StoryModule } from './story/story.module';

// 导入组件
import { AppComponent } from './app.component';
import { BackcanvasComponent } from './canvas/backcanvas/backcanvas.component';
import { SnakeComponent } from './canvas/snake/snake.component';
import { TankComponent } from './canvas/tank/tank.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { GamesComponent } from './games/games.component';
import { MusicComponent } from './music/music.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

// 导入管道


// 导入服务
import { GlobalService } from './service/global.service';
import { LocalStorage } from './service/local.storage';


@NgModule({
	declarations: [
		AppComponent,
		BackcanvasComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		GamesComponent,
		MusicComponent,
		PagenotfoundComponent,
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		FsDirectiveModule,
		StoryModule,
		FunnysRoutingModule,
	],
	providers: [
		{provide: GlobalService, useClass: GlobalService},
		{ provide: LocalStorage, useClass: LocalStorage}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
