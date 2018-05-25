/**
 * 添加HTMLInput事件
 */
export interface HTMLInputEvent extends Event {
	target: HTMLInputElement & EventTarget;
}

export interface All {
	[propName: string]: any;
}
