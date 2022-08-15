import { _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('UiManager')
@menu('Managers/UiManager')
export default class UiManager extends Component {
    //#region editors fields and properties
    @property({ type: Node })
    protected rootNode: Node = null;

    @property({ type: [Prefab] })
    protected uiElements: Prefab[] = [];
    //#endregion

    //#region public fields and properties
    //#endregion
        
    //#region private fields and properties
    //#endregion

	//#region life-cycle callbacks
    public onEnable(): void {
        this._createUiElements();
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
    }

    private _createUiElements(): void {
        this.uiElements.forEach(elementPrefab => {
            const elementNode: Node = instantiate(elementPrefab);
            elementNode.setParent(this.rootNode);
        })
    }
	//#endregion

	//#region event handlers
    //#endregion
}