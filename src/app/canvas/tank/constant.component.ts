export class Constant {
	/**
	 * 静态变量
	*/

	SCREEN_WIDTH = 512; // 屏幕宽
	SCREEN_HEIGHT = 448; // 屏幕高


	/**************图片资源*****************/
	MENU_IMAGE = new HTMLImageElement();
	// MENU_IMAGE.src = 'images/menu.gif';
	// tslint:disable-next-line:semicolon
	RESOURCE_IMAGE = new HTMLImageElement();
	// RESOURCE_IMAGE.src = 'images/tankAll.gif';


	/**************各个图块在图片中的位置*****************/
	POS: object = {
		selectTank: [128, 96],
		stageLevel: [396, 96],
		num: [256, 96],
		map: [0, 96],
		home: [256, 0],
		score: [0, 112],
		player: [0, 0],
		protected: [160, 96],
		enemyBefore: [256, 32],
		enemy1: [0, 32],
		enemy2: [128, 32],
		enemy3: [0, 64],
		bullet: [80, 96],
		tankBomb: [0, 160],
		bulletBomb: [320, 0],
		over: [384, 64],
		prop: [256, 110]
	};

	/**************声音资源*****************/
	START_AUDIO = new Audio('audio/start.mp3');
	BULLET_DESTROY_AUDIO = new Audio('audio/bulletCrack.mp3');
	TANK_DESTROY_AUDIO = new Audio('audio/tankCrack.mp3');
	PLAYER_DESTROY_AUDIO = new Audio('audio/playerCrack.mp3');
	MOVE_AUDIO = new Audio('audio/move.mp3');
	ATTACK_AUDIO = new Audio('audio/attack.mp3');
	PROP_AUDIO = new Audio('audio/prop.mp3');


	/**************游戏状态*****************/
	GAME_STATE_MENU = 0;
	GAME_STATE_INIT = 1;
	GAME_STATE_START = 2;
	GAME_STATE_OVER = 3;
	GAME_STATE_WIN = 4;

	/**************地图块*****************/
	WALL = 1;
	GRID = 2;
	GRASS = 3;
	WATER = 4;
	ICE = 5;
	HOME = 9;
	ANOTHREHOME = 8;

	/**************坦克及子弹的四个方向*****************/
	UP = 0;
	DOWN = 1;
	LEFT = 2;
	RIGHT = 3;

	/**************坦克及子弹的四个方向*****************/
	ENEMY_LOCATION = [192, 0, 384]; // 相对与主游戏区

	/**************子弹类型*****************/
	BULLET_TYPE_PLAYER = 1;
	BULLET_TYPE_ENEMY = 2;
	/**************爆炸类型****************/
	CRACK_TYPE_TANK = 'tank';
	CRACK_TYPE_BULLET = 'bullet';
}
