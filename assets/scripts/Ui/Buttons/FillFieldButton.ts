import { log, _decorator, Animation } from 'cc';
import EventManager from '../../Managers/Events/GameEventManager';
import SystemButton from './SystemButton';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('FillFieldButton')
@menu('Ui/Buttons/FillFieldButton')
export default class FillFieldButton extends SystemButton {
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
    private _fillField(): void {
        EventManager.sendFillField();
    }
	//#endregion

	//#region event handlers
    public onTouchDown(): void {
        super.onDown();
    }

    public onTouchUp(): void {
        super.onUp();
        this._fillField();
    }

    public onTouchMove(): void {
        super.onMove();
    }

    public onTouchCancel(): void {
        super.onCancel();
    }
    //#endregion
}