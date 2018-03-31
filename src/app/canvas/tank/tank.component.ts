import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { Renderer2 } from '@angular/core';


import { Constant } from './constant';
import { GV } from './main';
import { Menu } from './menu';
import { PlayerTank } from './tanks';
import { Stage } from './stage';

@Component({
	selector: 'fs-tank',
	template: `<div #tankwrap>
		<canvas #wall></canvas>
		<canvas #tank></canvas>
		<canvas #grass></canvas>
		<canvas #over></canvas>
		<canvas #stage></canvas>
	</div>`,
	styleUrls: ['./tank.css']
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
		GV.menu = new Menu(this.stage);
		GV.stage = new Stage(this.stage);
		GV.player1 = new PlayerTank(this.tank);
		GV.player2 = new PlayerTank(this.tank);
	}

	gameLoop() {
		switch (GV.gameState) {
			case Constant.GAME_STATE_MENU:
				GV.menu.draw();
				break;
			case Constant.GAME_STATE_INIT:
				GV.stage.draw();
				if (GV.stage.isReady) {
					GV.gameState = Constant.GAME_STATE_START;
				}
		}

		requestAnimationFrame(() => {
			this.gameLoop();
		});
	}


	@HostListener('document:keydown', ['$event'])
	keyboardInput(e: KeyboardEvent) {
		switch (GV.gameState) {

			// 选择玩家数
			case Constant.GAME_STATE_MENU:

				if (e.key === 'Enter') {
					GV.gameState = Constant.GAME_STATE_INIT;

					if (GV.menu.playerNum === 1) {
						GV.player2.lives = 0;
					}
				}else {
					let n = 0;
					if (e.key === 'ArrowDown') {
						n = 1;
					}else if (e.key === 'ArrowUp') {
						n = -1;
					}
					GV.menu.next(n);
				}
				break;

			// 发射子弹
			case Constant.GAME_STATE_START:
				if (!GV.keys.includes(e.key)) {
					GV.keys.push(e.key);
				}
				if (e.key === 'Space' && GV.player1.lives > 0) {
					GV.player1.shoot(Constant.BULLET_TYPE_PLAYER);
				}else if (e.key === 'Enter' && GV.player2.lives > 0) {
					GV.player2.shoot(Constant.BULLET_TYPE_PLAYER);
				}
				break;

			default:
				break;
		}

		this.switchDir();


	}

	@HostListener('document:keyup', ['$event'])
	keyboardOutput(e: KeyboardEvent) {
		GV.keys['remove'](e.key);
	}

	switchDir() {
		if (GV.keys.includes('W')) {
			GV.player1.dir = Constant.UP;
		}else if (GV.keys.includes('S')) {
			GV.player1.dir = Constant.DOWN;
		}else if (GV.keys.includes('A')) {
			GV.player1.dir = Constant.LEFT;
		}else if ( GV.keys.includes('D')) {
			GV.player1.dir = Constant.RIGHT;
		}
		GV.player1.hit = false;
		GV.player1.move();

		if (GV.keys.includes('ArrowUp')) {
			GV.player2.dir = Constant.UP;
		}else if (GV.keys.includes('ArrowDown')) {
			GV.player2.dir = Constant.DOWN;
		}else if (GV.keys.includes('ArrowRight')) {
			GV.player2.dir = Constant.RIGHT;
		}else if (GV.keys.includes('ArrowLeft')) {
			GV.player2.dir = Constant.LEFT;
		}
		GV.player2.hit = false;
		GV.player2.move();
	}

		// window.addEventListener('keydown', e => {
		// 	switch (GV.gameState) {
		// 		case Constant.GAME_STATE_MENU:
		// 			if (e.keyCode === keyboard.ENTER) {

		// 			}
		// 			break;
			
		// 		default:
		// 			break;
		// 	}
		// })

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

