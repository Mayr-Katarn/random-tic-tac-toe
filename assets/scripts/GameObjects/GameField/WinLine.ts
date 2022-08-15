import { log, _decorator, Component, Enum, Node, Vec3, UITransform, Size, tween } from 'cc';
import { WinLineType } from '../Enums/WinLineType';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('WinLine')
@menu('GameObjects/GameField/WinLine')
export default class WinLine extends Component {
    //#region editors fields and properties
    @property({ type: Node })
    protected renderNode: Node = null;

    @property
    protected drowDuration: number = 0.3;
    //#endregion

    //#region public fields and properties
    //#endregion
        
    //#region private fields and properties
    private readonly LINE_HEIGHT: number = 16 as const;
    private readonly INIT_LINE_SIZE = new Size(0, this.LINE_HEIGHT);
    private _targetWidth: number;
    private _transform: UITransform;
    //#endregion

	//#region life-cycle callbacks
    public onEnable(): void {
        this._transform = this.renderNode.getComponent(UITransform);
    }
    //#endregion

    //#region public methods
    public setWinnerParams(type: WinLineType, position: Vec3, distance: number): void {
        this.renderNode.active = true;
        this._setAngle(type);
        this.node.setPosition(position);
        this._targetWidth = distance;
    }

    public drowLine(): void {
        const contentSize: Size = new Size(this._targetWidth, this.LINE_HEIGHT);
        tween(this._transform).to(this.drowDuration, { contentSize }).start();
    }

    public hide(): void {
        this.renderNode.active = false;
        this._transform.setContentSize(this.INIT_LINE_SIZE);
    }
	//#endregion

	//#region private methods
    private _setAngle(type: WinLineType): void {
        switch (type) {
            case WinLineType.Row:
                this.renderNode.angle = 0;
                break;

            case WinLineType.Col:
                this.renderNode.angle = 90;
                break;

            case WinLineType.CrossToRight:
                this.renderNode.angle = 45;
                break;

            case WinLineType.CrossToLeft:
                this.renderNode.angle = 135;
                break;
        }
    }
	//#endregion

	//#region event handlers
    //#endregion
}