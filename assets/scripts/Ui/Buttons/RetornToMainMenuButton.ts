import { log, _decorator } from 'cc';
import EventManager from '../../Managers/Events/GameEventManager';
import { SceneType } from '../../SceneType';
import SystemButton from './StartGameButton';

//#region classes-helpers
const { ccclass, menu, property } = _decorator;
//#endregion

@ccclass('RetornToMainMenuButton')
@menu('Ui/Buttons/RetornToMainMenuButton')
export default class RetornToMainMenuButton extends SystemButton {
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
    private _returnToMainMenu(): void {
        EventManager.sendStartScene(SceneType.MainMenu);
    }
	//#endregion

	//#region event handlers
    public onTouchDown(): void {
        super.onDown();
    }

    public onTouchUp(): void {
        super.onUp();
        this._returnToMainMenu();
    }

    public onTouchMove(): void {
        super.onMove();
    }

    public onTouchCancel(): void {
        super.onCancel();
    }
    //#endregion
}