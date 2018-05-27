import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { GamesComponent } from './games.component';
import { GamesListComponent } from './games-list.component';
import { GTankComponent } from './g-tank.component';
import { GSnakeComponent } from './g-snake.component';

const Routera: Routes = [
	{
		path: 'game',
		component: GamesComponent,
		children: [
			{
				path: 'list',
				component: GamesListComponent
			},
			{
				path: 'tank',
				component: GTankComponent
			},
			{
				path: 'snake',
				component: GSnakeComponent
			}
		]
	}
];

@NgModule({
	imports: [
		RouterModule.forChild(Routera)
	],
	exports: [RouterModule]
})
export class StoryRoutingModule {

}
