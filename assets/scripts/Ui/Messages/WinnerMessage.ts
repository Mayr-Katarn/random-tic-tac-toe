import { log, _decorator, Animation, Component, Color, Label } from 'cc';
import { UiEvent, uiEventTarget } from '../../EventEnums/UiEvents';
import EventManager from '../../Managers/Events/GameEventManager';
import { SceneType } from '../../SceneType';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('WinnerMessage')
@menu('Ui/Messages/WinnerMessage')
export default class WinnerMessage extends Component {
    //#region editors fields and properties
    @property({ type: Label })
    protected label: Label = null;
    //#endregion

    //#region public fields and properties
    //#endregion
        
    //#region private fields and properties
    private _animation: Animation;
    //#endregion

    //#region life-cycle callbacks
    public onEnable(): void {
        this._animation = this.getComponent(Animation);
        this._eventListener(true);
    }

    public onDisable(): void {
        this._eventListener(false);
    }
    //#endregion

    //#region public methods
	//#endregion

	//#region private methods
    private _eventListener(isOn: boolean): void {
        const func: string = isOn ? "on" : "off";
        uiEventTarget[func](UiEvent.SET_WINNER_MSG, this.onSetWinnerMessage, this);
    }

    private _setWinnerMsg(msg: string, color: Color): void {
        this.label.string = msg;
        this.label.color = color;
        this._animation.play(this._animation.defaultClip.name);
    }
	//#endregion

	//#region event handlers
    public onSetWinnerMessage(msg: string, color: Color): void {
        this._setWinnerMsg(msg, color);
    }
    //#endregion
}