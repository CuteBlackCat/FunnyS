import { PlayerTank } from './tanks';
import { Constant } from './constant';
import { Menu } from './menu';
import { Stage } from './stage';

class GolbalVariables {
	emenyStopTime: number;
	gameState: number;

	/**
	 * 需要全局使用的对象
	 */
	map: object;
	menu: Menu;
	stage: Stage;
	player1: PlayerTank;
	player2: PlayerTank;

	bulletArray: Array<any>;
	crackArray: Array<any>;
	keys: Array<any>; // 键盘按过的


	/**
	 * 消除魔术字符串
	 */
	enemyOne: Symbol;
	enemyTwo: Symbol;
	enemyThree: Symbol;

	constructor() {
		this.emenyStopTime = 0;
		this.gameState = Constant.GAME_STATE_MENU;


		this.map = null;
		this.menu = null;
		this.stage = null;
		this.bulletArray = [];
		this.crackArray = [];
		this.keys = [];


		this.enemyOne = Symbol();
		this.enemyTwo = Symbol();
		this.enemyThree = Symbol();
	}
}

export let GV = new GolbalVariables();
