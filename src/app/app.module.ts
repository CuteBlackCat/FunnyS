// 导入核心模块
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// 导入自定义模块
import { FsDirectiveModule } from './directive/directive.module';
import { FunnysRoutingModule } from './funnys-routing.module';

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
import { StoryComponent } from './story/story.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

// 导入管道


// 导入服务
import { GlobalService } from './service/global.service';


@NgModule({
	declarations: [
		AppComponent,
		BackcanvasComponent,
		HomeComponent,
		LoginComponent,
		RegisterComponent,
		GamesComponent,
		MusicComponent,
		StoryComponent,
		PagenotfoundComponent,
	],
	imports: [
		BrowserModule,
		FsDirectiveModule,
		FunnysRoutingModule,
	],
	providers: [{provide: GlobalService, useClass: GlobalService}],
	bootstrap: [AppComponent]
})
export class AppModule { }
