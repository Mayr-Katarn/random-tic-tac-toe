import { log, _decorator, Component, Sprite, Color, Tween, tween, ITweenOption, Vec3, Node, Widget, Animation } from 'cc';
import StateManager from '../../Managers/State/StateManager';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('SystemButton')
@menu('Ui/Buttons/SystemButton')
export default class SystemButton extends Component {
    //#region editors fields and properties
    @property({ type: Node })
    protected renderNode: Node = null;

    @property
    protected onDownColor: Color = new Color();

    @property
    protected onDownScale: Vec3 = new Vec3();

    @property
    protected tweenDuration: number = 0.4;

    @property({ type: Animation })
    protected animation: Animation = null;
    //#endregion

    //#region public fields and properties
    //#endregion
        
    //#region private fields and properties
    private _startColor: Color;
    private _renderSprite: Sprite;
    private _scaleTween: Tween<Node>;
    //#endregion

	//#region life-cycle callbacks

    public onEnable(): void {
        this._renderSprite = this.renderNode.getComponent(Sprite);
        this._startColor = Object.assign({}, this._renderSprite.color);
        this.getComponent(Widget).updateAlignment();
        StateManager.isInitLaunch && this.animation?.play(this.animation.defaultClip.name);
    }
    // #endregion

    //#region public methods
	//#endregion

	//#region private methods
    private _touchDownAnimation(): void {
        this._playScaleTween(true);
        this._setButtonColor(true);
    }

    private _touchUpAnimation(): void {
        this._playScaleTween(false);
        this._setButtonColor(false);
    }

    private _playScaleTween(isDown: boolean): void {
        this._scaleTween?.stop();

        const scale: Vec3 = isDown ? this.onDownScale : Vec3.ONE;
        const options: ITweenOption = {}

        this._scaleTween = tween(this.node)
            .to(this.tweenDuration, { scale }, options)
            .start();
    }

    private _setButtonColor(isDown: boolean): void {
        const color: Color = isDown ? this.onDownColor : this._startColor;
        this._renderSprite.color = color;
    }
	//#endregion

	//#region event handlers
    public onDown(): void {
        this._touchDownAnimation();
    }

    public onUp(): void {
        this._touchUpAnimation();
    }

    public onMove(): void {}

    public onCancel(): void {
        this._touchUpAnimation();
    }
    //#endregion
}