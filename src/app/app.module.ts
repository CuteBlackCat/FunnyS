// 导入核心模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// 导入自定义模块
import { CanvasModule } from './canvas/canvas.module';
import { FsDirectiveModule } from './directive/directive.module';
import { FunnysRoutingModule } from './funnys-routing.module';
import { StoryModule } from './story/story.module';
import { SignModule } from './sign/sign.module';
import { MusicModule } from './music/music.module';
import { GamesModule } from './games/games.module';

// 导入组件
import { AppComponent } from './app.component';
// import { BackcanvasComponent } from './canvas/backcanvas/backcanvas.component';
// import { SnakeComponent } from './canvas/snake/snake.component';
// import { TankComponent } from './canvas/tank/tank.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

// 导入管道


// 导入服务
import { GlobalService } from './service/global.service';
import { LocalStorage } from './service/local.storage';


@NgModule({
	declarations: [
		AppComponent,
		// BackcanvasComponent,
		HomeComponent,
		// GamesComponent,
		AboutComponent,
		// SnakeComponent,
		PagenotfoundComponent,
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		ReactiveFormsModule,
		FormsModule,
		CanvasModule,
		FsDirectiveModule,
		StoryModule,
		MusicModule,
		SignModule,
		GamesModule,
		FunnysRoutingModule,
	],
	providers: [
		{ provide: GlobalService, useClass: GlobalService },
		{ provide: LocalStorage, useClass: LocalStorage }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
