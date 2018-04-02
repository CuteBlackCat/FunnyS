import { Num } from './num';
import { Maps } from './mapData';
import { Constant } from './constant';

export class Map {

	level: number;
	mapLevel: Array<any>;
	wallCtx: CanvasRenderingContext2D;
	grassCtx: CanvasRenderingContext2D;

	offsetX: number; // 主游戏区的X轴的偏移量
	offsetY: number; // 主游戏区的y轴的偏移量
	wTileCount: number; // 主游戏区的宽度地图块数
	hTileCount: number; // 主游戏区的高度地图块数
	tileSize: number; // 地图块的大小
	homeSize: number; // 家图标的大小
	num: Num;
	mapWidth: number;
	mapHeight: number;

	constructor(wCtx, gCts) {
		this.level = 1;
		this.mapLevel = null;
		this.wallCtx = wCtx;
		this.grassCtx = gCts;
		this.offsetX = 32;
		this.offsetY = 16;
		this.wTileCount = 26;
		this.hTileCount = 26;
		this.tileSize = 16;
		this.homeSize = 32;
		this.num = new Num(this.wallCtx);
		this.mapWidth = 416;
		this.mapHeight = 416;
	}

	/**
	 * 重置地图等级
	 * @param level 地图等级
	 */
	setMapLevel(level: number) {
		this.level = level;
		const tempMap = `map${this.level}`;
		const currentMap = Maps[tempMap];
		this.mapLevel = [];

		for (const map of currentMap) {
			let i = 0;
			this.mapLevel[i] = [];
			for (const mapj of map) {
				let j = 0;
				this.mapLevel[i][j] = mapj;
				j++;
			}
			i++;
		}
	}

	/**
	 * 绘制地图
	 */
	draw() {
		this.wallCtx.fillStyle = '#7f7f7f';
		this.wallCtx.fillRect(0, 0, Constant.SCREEN_WIDTH, Constant.SCREEN_HEIGHT);
		this.wallCtx.fillStyle = '#000';
		this.wallCtx.fillRect(this.offsetX, this.offsetY, this.mapWidth, this.mapHeight);

		this.grassCtx.clearRect(0, 0, Constant.SCREEN_WIDTH, Constant.SCREEN_HEIGHT);

		for (let i = 0; i < this.hTileCount; i++) {
			for (let j = 0; j < this.wTileCount; j++) {
				if (this.mapLevel[i][j] === Constant.WALL || this.mapLevel[i][j] === Constant.GRID || this.mapLevel[i][j] === Constant.WATER || this.mapLevel[i][j] === Constant.ICE) {
					this.wallCtx.drawImage(Constant.RESOURCE_IMAGE, this.tileSize * (this.mapLevel[i][j] - 1) + Constant.POS['map'][0], Constant.POS['map'][1], this.tileSize, this.tileSize, j * this.tileSize + this.offsetX, i * this.tileSize + this.offsetY, this.tileSize, this.tileSize);
				} else if (this.mapLevel[i][j] === Constant.GRASS) {
					this.grassCtx.drawImage(Constant.RESOURCE_IMAGE, this.tileSize * (this.mapLevel[i][j] - 1) + Constant.POS['map'][0], Constant.POS['map'][1], this.tileSize, this.tileSize, j * this.tileSize + this.offsetX, i * this.tileSize + this.offsetY, this.tileSize, this.tileSize);
				} else if (this.mapLevel[i][j] === Constant.HOME) {
					this.wallCtx.drawImage(Constant.RESOURCE_IMAGE, Constant.POS['home'][0], Constant.POS['home'][1], this.homeSize, this.homeSize, j * this.tileSize + this.offsetX, i * this.tileSize + this.offsetY, this.homeSize, this.homeSize);
				}
			}
		}

		this.drawNoChange();
		// this.drawEnemyNum(maxEnemy);
		// this.drawLevel();
		// this.drawLives(0, 1);
		// this.drawLives(0, 2);
	}

	drawNoChange() {
		// this.wallCtx.drawImage
	}
}
