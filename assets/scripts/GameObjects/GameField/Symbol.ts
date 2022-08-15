import { log, _decorator, Component, SpriteFrame, Sprite, Vec3, Animation, Color } from 'cc';
import SymbolType from '../Enums/SymbolType';

//#region classes-helpers
const { ccclass, property, menu, executeInEditMode } = _decorator;
//#endregion

@ccclass('Symbol')
@menu('GameObjects/GameField/Symbol')
@executeInEditMode(true)
export default class Symbol extends Component {

    //#region editors fields and properties
    @property({ type: Sprite })
    protected renderSprite: Sprite = null;

    @property({ type: SpriteFrame })
    protected crossSpriteFrame: SpriteFrame = null;

    @property
    public crossColor: Color = new Color();

    @property({ type: SpriteFrame })
    protected zeroSpriteFrame: SpriteFrame = null;
    
    @property
    public zeroColor: Color = new Color();

    // @property
    // protected initMoveTweenDuration: number = 0.5;
    
    // @property
    // protected moveToBotCellTweenDuration: number = 0.1;
    //#endregion

    //#region public fields and properties
    public symbolType: number = SymbolType.None
    public row: number;
    public col: number;
    //#endregion
    
    //#region private fields and properties
    private _animation: Animation;
    //#endregion

	//#region life-cycle callbacks
    //#endregion

    //#region public methods
    public onEnable(): void {
        this._animation = this.getComponent(Animation);
    }

    public init(row: number, col: number, position: Vec3): void {
        this.row = row;
        this.col = col;
        this.setLocalPosition(position);
    }

    public setLocalPosition(position: Vec3): this {
        this.node.position = position;
        return this;
    }

    public setSymbolType(symbolType: number): void {
        this.symbolType = symbolType;

        switch (this.symbolType) {
            case SymbolType.None: 
                this.renderSprite.spriteFrame = null;
                break;

            case SymbolType.Cross: 
                this.renderSprite.spriteFrame = this.crossSpriteFrame;
                this.renderSprite.color = this.crossColor;
                break;

            case SymbolType.Zero: 
                this.renderSprite.spriteFrame = this.zeroSpriteFrame;
                this.renderSprite.color = this.zeroColor;
                break;
        }
    }

    public playRevealAnimation(): void {
        this._animation.play(this._animation.defaultClip.name);
    }
	//#endregion

	//#region private methods
	//#endregion

	//#region event handlers
    //#endregion
}
