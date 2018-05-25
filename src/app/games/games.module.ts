import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { ConfigService } from './games.service';

@NgModule({
	declarations: [

	],
	imports: [

	],
	exports: [

	],
	providers: [{ provide: ConfigService, useClass: ConfigService }]
})
export class StoryModule {

}
