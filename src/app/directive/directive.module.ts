import { BrowserModule } from '@angular/platform-browser';
import { SliderComponent } from './slider/slider.component';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { StoryCardComponent } from './storycard/storycard.component';

@NgModule({
	declarations: [
		CardComponent,
		SliderComponent,
		StoryCardComponent
	],
	imports: [BrowserModule],
	exports: [SliderComponent, CardComponent, StoryCardComponent]
})

export class FsDirectiveModule {

}
