import { BrowserModule } from '@angular/platform-browser';
import { SliderComponent } from './slider/slider.component';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { StoryCardComponent } from './storycard/storycard.component';
import { InterceptStringPipe } from './storycard/storycard.pipe';
import { EngineerComponent } from './engineer/engineer.component';

@NgModule({
	declarations: [
		CardComponent,
		SliderComponent,
		StoryCardComponent,
		InterceptStringPipe,
		EngineerComponent
	],
	imports: [BrowserModule],
	exports: [SliderComponent, CardComponent, StoryCardComponent, EngineerComponent, InterceptStringPipe]
})

export class FsDirectiveModule {

}
