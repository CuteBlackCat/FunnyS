import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoryComponent } from './story.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';

const Routes: Routes = [
	{
		path: 'story',
		component: StoryComponent,
		children: [
			{
				path: '',
				redirectTo: 'list',
				pathMatch: 'full'
			},
			{
				path: 'list',
				component: StoryListComponent
			},
			{
				path: 'detail',
				component: StoryDetailComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(Routes)
	],
	exports: [RouterModule]
})
export class StoryRoutingModule {

}
