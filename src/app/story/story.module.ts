import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoryComponent } from './story.component';
import { StoryListComponent } from './story-list/story-list.component';
// import { StoryTypeComponent } from './story-type/story-type.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
import { StoryRoutingModule } from './story-router.module';
import { FsDirectiveModule } from '../directive/directive.module';
import { StoryLPublicComponent } from './story-public/story-public.component';
import { ConfigService } from './story.service';
import { StoryTypeComponent } from './story-type/story-type.component';

@NgModule({
	declarations: [
		StoryComponent,
		StoryDetailComponent,
		StoryListComponent,
		StoryLPublicComponent,
		StoryTypeComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule,
		FormsModule,
		FsDirectiveModule,
		StoryRoutingModule,
	],
	exports: [
		StoryComponent,
		StoryDetailComponent,
		StoryListComponent,
		StoryLPublicComponent,
		StoryTypeComponent
	],
	providers: [{provide: ConfigService, useClass: ConfigService}]
})
export class StoryModule {

}
