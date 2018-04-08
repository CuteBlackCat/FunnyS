import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoryComponent } from './story.component';
import { StoryListComponent } from './story-list/story-list.component';
// import { StoryTypeComponent } from './story-type/story-type.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryRoutingModule } from './story-router.module';
import { FsDirectiveModule } from '../directive/directive.module';

@NgModule({
	declarations: [
		StoryComponent,
		StoryDetailComponent,
		StoryListComponent,
	],
	imports: [
		BrowserModule,
		FsDirectiveModule,
		StoryRoutingModule,
	],
	exports: [
		StoryComponent,
		StoryDetailComponent,
		StoryListComponent,
	]
})
export class StoryModule {

}
