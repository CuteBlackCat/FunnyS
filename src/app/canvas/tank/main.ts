import { Constant } from './constant';
import { Menu } from './menu';

class GolbalVariables {
	emenyStopTime: number;
	gameState: number;

	/**
	 * 需要全局使用的对象
	 */
	map: object;
	menu: Menu;

	bulletArray: Array<any>;

	constructor() {
		this.emenyStopTime = 0;
		this.gameState = Constant.GAME_STATE_MENU;


		this.map = null;
		this.menu = null;
		this.bulletArray = [];
	}
}

export let globalVariables = new GolbalVariables();
