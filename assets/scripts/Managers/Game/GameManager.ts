import { log, _decorator, Component, Node, Prefab, instantiate, Vec3 } from 'cc';
import GameField from '../../GameObjects/GameField/GameField';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('GameManager')
@menu('Managers/GameManager')
export default class GameManager extends Component {

    //#region editors fields and properties
    @property({ type: Node, tooltip: "Корневая родительская нода" })
    protected rootNode: Node = null;

    @property({ type: Prefab, tooltip: "Префаб поля" })
    protected gameFieldPrefab: Prefab = null;
    //#endregion

    //#region public fields and properties
    //#endregion

    //#region private fields and properties
    //#endregion

	//#region life-cycle callbacks
    public start(): void {
        this._createGameField();
    }
    //#endregion

    //#region public methods
	//#endregion

	//#region private methods
    private _createGameField(): void {
        const gameField: Node = instantiate(this.gameFieldPrefab);
        gameField.setParent(this.rootNode);
        gameField.setPosition(Vec3.ZERO);
        gameField.getComponent(GameField).init();
    }
	//#endregion

	//#region event handlers
    //#endregion
}