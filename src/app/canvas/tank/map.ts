import { Num } from './num';

export class Map {

	level: number;
	mapLevel: Array<any>;
	wallCtx: CanvasRenderingContext2D;
	grassCtx: CanvasRenderingContext2D;

	offserX: number; // 主游戏区的X轴的偏移量
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
		this.offserX = 32;
		this.offsetY = 16;
		this.wTileCount = 26;
		this.hTileCount = 26;
		this.tileSize = 16;
		this.homeSize = 32;
		this.num = new Num(this.wallCtx);
		this.mapWidth = 416;
		this.mapHeight = 416;
	}

	setMapLevel(level: number) {
		this.level = level;
		const tempMap = 
	}
}
