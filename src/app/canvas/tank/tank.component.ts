import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Renderer2 } from '@angular/core';


import { Constant } from './constant';
import { globalVariables } from './main';
import { Menu } from './menu';

@Component({
	selector: 'fs-tank',
	template: `<div #tankwrap>
		<canvas #wall></canvas>
		<canvas #tank></canvas>
		<canvas #grass></canvas>
		<canvas #over></canvas>
		<canvas #stage></canvas>
	</div>`,
	styleUrls: ['./tank.component.css']
})
export class TankComponent implements OnInit, AfterViewInit {

	@ViewChild('wall') wallRef: ElementRef;
	@ViewChild('tank') tankRef: ElementRef;
	@ViewChild('grass') grassRef: ElementRef;
	@ViewChild('over') overRef: ElementRef;
	@ViewChild('stage') stageRef: ElementRef;
	@ViewChild('tankwrap') tankwrapRef: ElementRef;


	// canvas
	wall: CanvasRenderingContext2D;
	tank: CanvasRenderingContext2D;
	over: CanvasRenderingContext2D;
	stage: CanvasRenderingContext2D;
	tankwrap: ElementRef;
	grass: CanvasRenderingContext2D;

	// attribute

	constructor(private render: Renderer2) {

	}

	initObject() {
		globalVariables.menu = new Menu(this.stage);
	}

	gameLoop() {
		switch (globalVariables.gameState) {
			case Constant.GAME_STATE_MENU:
				globalVariables.menu.draw();
				break;
		}

		requestAnimationFrame(() => {
			this.gameLoop();
		});
	}

	ngAfterViewInit() {
		this.wall = this.wallRef.nativeElement.getContext('2d');
		this.tank = this.tankRef.nativeElement.getContext('2d');
		this.grass = this.grassRef.nativeElement.getContext('2d');
		this.over = this.overRef.nativeElement.getContext('2d');
		this.stage = this.stageRef.nativeElement.getContext('2d');
		// this.tankwrap = this.tankwrapRef.nativeElement.getContext('2d');

		this.stageRef.nativeElement.width = Constant.SCREEN_WIDTH;
		this.stageRef.nativeElement.height = Constant.SCREEN_HEIGHT;
		this.tankRef.nativeElement.width = Constant.SCREEN_WIDTH;
		this.tankRef.nativeElement.height = Constant.SCREEN_HEIGHT;
		this.tankRef.nativeElement.width = Constant.SCREEN_WIDTH;
		this.tankRef.nativeElement.height = Constant.SCREEN_HEIGHT;
		this.overRef.nativeElement.width = Constant.SCREEN_WIDTH;
		this.overRef.nativeElement.height = Constant.SCREEN_HEIGHT;
		this.wallRef.nativeElement.width = Constant.SCREEN_WIDTH;
		this.wallRef.nativeElement.height = Constant.SCREEN_HEIGHT;
		this.render.setStyle(this.tankwrapRef.nativeElement, 'width', Constant.SCREEN_WIDTH);
		this.render.setStyle(this.tankwrapRef.nativeElement, 'height', Constant.SCREEN_HEIGHT);

		this.initObject();
		this.gameLoop();
	}

	ngOnInit() {
	}

}

