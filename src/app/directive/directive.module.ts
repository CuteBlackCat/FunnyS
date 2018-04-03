import { BrowserModule } from '@angular/platform-browser';
import { SliderComponent } from './slider/slider.component';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';

@NgModule({
	declarations: [
		CardComponent,
		SliderComponent
	],
	imports: [BrowserModule],
	exports: [SliderComponent, CardComponent]
})

export class FsDirectiveModule {

}
