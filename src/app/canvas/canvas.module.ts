import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TankComponent } from './tank/tank.component';
import { SnakeComponent } from './snake/snake.component';
import { BackcanvasComponent } from './backcanvas/backcanvas.component';
import { AddnumComponent } from './2048/addnum.component';

@NgModule({
	declarations: [
		TankComponent,
		AddnumComponent,
		SnakeComponent,
		BackcanvasComponent
	],
	exports: [
		TankComponent,
		AddnumComponent,
		SnakeComponent,
		BackcanvasComponent
	],
	imports: [
		BrowserModule
	],
	providers: []
})
export class CanvasModule {

}
