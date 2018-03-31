import { PlayerTank } from './tanks';
import { Constant } from './constant';
import { Menu } from './menu';
import { Stage } from './stage';

class GolbalVariables {
	emenyStopTime: number;
	gameState: number;
	level: number;
	maxEnemy: number; // 敌方坦克总数
	maxArrearEnemy: number; // 最大显示敌方数
	appearEnemy: number; // 已出现的敌方坦克


	isGameOver: boolean;

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
	enemyArray:  Array<any>; // 敌方坦克


	/**
	 * 消除魔术字符串
	 */
	enemyOne: Symbol;
	enemyTwo: Symbol;
	enemyThree: Symbol;

	constructor() {
		this.emenyStopTime = 0;
		this.level = 1;
		this.gameState = Constant.GAME_STATE_MENU;
		this.maxEnemy = 20;
		this.maxArrearEnemy = 5;
		this.appearEnemy = 0;

		this.isGameOver = false;


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

	initMap() {

	}
}

export let GV = new GolbalVariables();
