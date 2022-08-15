import { log, _decorator, Component, Node, EventTouch } from 'cc';
import { gameEventTarget, GameEvent } from '../../EventEnums/GameEvents';
import GameCommandType from './Enums/GameAreaCommandType';
import InputDirection from './Enums/InputDirection';
import { InputType } from './Enums/InputType';
import UiCommandType from './Enums/UiAreaCommandType';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('InputCatcher')
@menu('Input/InputCatcher')
export default class InputCatcher extends Component {
    //#region editors fields and properties
	@property({ type: InputDirection })
	set direction(value: number) { this._direction = value; }
	get direction(): number { return this._direction; }

	@property({
        type: UiCommandType,
        visible() { return this._direction === InputDirection.UiArea },
    })
	public uiAreaCommandType: number = UiCommandType.None;

	@property({
        type: GameCommandType,
        visible() { return this._direction === InputDirection.GameArea },
    })
	public gameAreaCommandType: number = GameCommandType.None;
	//#endregion

    //#region private fields and properties
	@property({ serializable: true })
	private _direction: number = InputDirection.None;
    //#endregion

	//#region life-cycle callbacks
	public onEnable(): void {
		this._eventListener(true);
	}

	public onDisable(): void {
		this._eventListener(false);
	}
	//#endregion

	//#region public methods
	//#endregion

	//#region private methods
	private _eventListener(actived: boolean): void {
		const func = actived ? 'on' : 'off';

		this.node[func](Node.EventType.TOUCH_START, this.onDown, this);
		this.node[func](Node.EventType.TOUCH_MOVE, this.onMove, this);
		this.node[func](Node.EventType.TOUCH_END, this.onUp, this);
		this.node[func](Node.EventType.TOUCH_CANCEL, this.onCancel, this);
	}
	//#endregion

	//#region event handlers
	public onDown(event: EventTouch): void {
		gameEventTarget.emit(GameEvent.INPUT, InputType.Down, this.direction, event.touch, this);
	}

	public onMove(event: EventTouch): void {
		gameEventTarget.emit(GameEvent.INPUT, InputType.Move, this.direction, event.touch, this);
	}

	public onUp(event: EventTouch): void {
		gameEventTarget.emit(GameEvent.INPUT, InputType.Up, this.direction, event.touch, this);
	}

	public onCancel(event: EventTouch): void {
		gameEventTarget.emit(GameEvent.INPUT, InputType.Cancel, this.direction, event.touch, this);
	}
	//#endregion
}
