import { log, _decorator } from 'cc';
import EventManager from '../../Managers/Events/GameEventManager';
import SystemButton from './SystemButton';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('CheckFieldButton')
@menu('Ui/Buttons/CheckFieldButton')
export default class CheckFieldButton extends SystemButton {
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
    private _checkField(): void {
        EventManager.sendCheckField();
    }
	//#endregion

	//#region event handlers
    public onTouchDown(): void {
        super.onDown();
    }

    public onTouchUp(): void {
        super.onUp();
        this._checkField();
    }

    public onTouchMove(): void {
        super.onMove();
    }

    public onTouchCancel(): void {
        super.onCancel();
    }
    //#endregion
}