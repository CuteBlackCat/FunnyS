import { BrowserModule } from '@angular/platform-browser';
import { SliderComponent } from './slider/slider.component';
import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { StoryCardComponent } from './storycard/storycard.component';
import { InterceptStringPipe } from './storycard/storycard.pipe';
import { EngineerComponent } from './engineer/engineer.component';
import { ProgressComponent } from './progress/progress.component';
import { AlertComponent } from './alertinfo.component';
import { LoadingComponent } from './loading.component';

@NgModule({
	declarations: [
		CardComponent,
		SliderComponent,
		StoryCardComponent,
		InterceptStringPipe,
		EngineerComponent,
		ProgressComponent,
		AlertComponent,
		LoadingComponent
	],
	imports: [BrowserModule],
	exports: [SliderComponent, CardComponent, StoryCardComponent, EngineerComponent, ProgressComponent, InterceptStringPipe, AlertComponent, LoadingComponent]
})

export class FsDirectiveModule {

}
