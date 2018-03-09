import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BackcanvasComponent } from './backcanvas/backcanvas.component';


@NgModule({
  declarations: [
    AppComponent,
    BackcanvasComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
