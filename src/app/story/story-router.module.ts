import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { StoryComponent } from './story.component';
import { StoryListComponent } from './story-list/story-list.component';
import { StoryDetailComponent } from './story-detail/story-detail.component';
// import { StoryTypeComponent } from './story-type/story-type.component';

const Routes: Routes = [
	{
		path: 'story',
		component: StoryComponent,
		children: [
			{
				path: 'list',
				component: StoryListComponent
			},
			// {
			// 	path: 'type:typeid',
			// 	component: StoryTypeComponent
			// },
			{
				path: 'detail:storyid',
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
