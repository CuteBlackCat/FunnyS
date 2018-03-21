import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BackcanvasComponent } from './canvas/backcanvas/backcanvas.component';
import { SnakeComponent } from './canvas/snake/snake.component';
import { TankComponent } from './canvas/tank/tank.component';


@NgModule({
  declarations: [
    AppComponent,
    BackcanvasComponent,
    SnakeComponent,
    TankComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
