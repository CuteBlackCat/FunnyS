import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';


import { Constant } from './constant';
import { globalVariables } from './main';
import { Menu } from './menu';
import { PlayerTank } from './tanks';

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
		globalVariables.player1 = new PlayerTank(this.tank);
		globalVariables.player2 = new PlayerTank(this.tank);
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


	@HostListener('document:keydown', ['$event'])
	keyboardInput(e: KeyboardEvent) {
		switch (globalVariables.gameState) {

			// 选择玩家数
			case Constant.GAME_STATE_MENU:

				if (e.key === 'Enter') {
					globalVariables.gameState = Constant.GAME_STATE_INIT;

					if (globalVariables.menu.playerNum === 1) {
						globalVariables.player2.lives = 0;
					}
				}else {
					let n = 0;
					if (e.key === 'Down') {
						n = 1;
					}else if (e.key === 'Up') {
						n = -1;
					}
					globalVariables.menu.next(n);
				}
				break;

			// 发射子弹
			case Constant.GAME_STATE_START:
				if (!globalVariables.keys.includes(e.keyCode)) {
					globalVariables.keys.push(e.keyCode);
				}
				if (e.key === 'Space' && globalVariables.player1.lives > 0) {
					globalVariables.player1.shoot(Constant.BULLET_TYPE_PLAYER);
				}else if (e.key === 'Enter' && globalVariables.player2.lives > 0) {
					globalVariables.player2.shoot(Constant.BULLET_TYPE_PLAYER);
				}
				break;

			default:
				break;
		}


	}

	@HostListener('document:keyup', ['$event'])
	keyboardOutput(e: KeyboardEvent) {
		globalVariables.keys['remove']();
	}

		// window.addEventListener('keydown', e => {
		// 	switch (globalVariables.gameState) {
		// 		case Constant.GAME_STATE_MENU:
		// 			if (e.keyCode === keyboard.ENTER) {

		// 			}
		// 			break;
			
		// 		default:
		// 			break;
		// 	}
		// })

	ngAfterViewInit() {
		const a = [1, 2];
		a['remove'](1);
		console.log(a);
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

