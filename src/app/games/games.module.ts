import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ConfigService } from './games.service';
import { GamesComponent } from './games.component';
import { GamesListComponent } from './games-list.component';
import { GTankComponent } from './g-tank.component';
import { GSnakeComponent } from './g-snake.component';
// import { SnakeComponent } from '../canvas/snake/snake.component';
// import { TankComponent } from '../canvas/tank/tank.component';

@NgModule({
	declarations: [
		GamesComponent,
		GamesListComponent,
		GTankComponent,
		GSnakeComponent,
		// SnakeComponent,
		// TankComponent
	],
	imports: [
		BrowserModule,
	],
	exports: [
		GamesComponent,
		GamesListComponent,
		GTankComponent,
		GSnakeComponent,
		// SnakeComponent,
		// TankComponent
	],
	providers: [{ provide: ConfigService, useClass: ConfigService }]
})
export class GamesModule {
}
