import { log, _decorator, Animation } from 'cc';
import EventManager from '../../Managers/Events/GameEventManager';
import { SceneType } from '../../SceneType';
import SystemButton from './SystemButton';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('StartGameButton')
@menu('Ui/Buttons/StartGameButton')
export default class StartGameButton extends SystemButton {
    //#region editors fields and properties
    //#endregion

    //#region public fields and properties
    //#endregion
        
    //#region private fields and properties
    //#endregion

	//#region life-cycle callbacks
    // #endregion

    //#region public methods
	//#endregion

	//#region private methods
    private _startGame(): void {
        EventManager.sendStartScene(SceneType.Game);
    }
	//#endregion

	//#region event handlers
    public onTouchDown(): void {
        super.onDown();
    }

    public onTouchUp(): void {
        super.onUp();
        this._startGame();
    }

    public onTouchMove(): void {
        super.onMove();
    }

    public onTouchCancel(): void {
        super.onCancel();
    }
    //#endregion
}