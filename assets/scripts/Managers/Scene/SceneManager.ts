import { _decorator, Component, Node, Prefab, instantiate, Vec3, Color, director, Scene, tween, View, ITweenOption, UIOpacity, view, } from 'cc';
import { GameEvent, gameEventTarget } from '../../EventEnums/GameEvents';
import { SceneType } from '../../SceneType';
import StateManager from '../State/StateManager';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('SceneManager')
@menu('Managers/SceneManager')
export default class SceneManager extends Component {
    //#region editors fields and properties
    @property({ type: Node })
    protected canvasRoot: Node = null;

    @property
    protected changeSceneTweenDuration: number = 0.4;
    //#endregion

    //#region public fields and properties
    //#endregion
        
    //#region private fields and properties
    private _cuttentScene: string;
    private _isSceneStarting: boolean = false;
    private _canvasRootOpacicy: UIOpacity;
    //#endregion

	//#region life-cycle callbacks
    public onEnable(): void {
        this._canvasRootOpacicy = this.canvasRoot.getComponent(UIOpacity);
        this._eventListener(true);
    }

    public start(): void {
        // Баг: при запуске название первой сцены равно пустой строке
        this._cuttentScene = director.getScene().name === '' ? SceneType.MainMenu : director.getScene().name;
        this._preloadScenes();
        this._revealScene();
    }
    
    public onDisable(): void {
        this._eventListener(false);
    }
    //#endregion

    //#region public methods
	//#endregion

	//#region private methods
    private _eventListener(isOn: boolean) {
        const func: string = isOn ? "on" : "off";
        gameEventTarget[func](GameEvent.START_SCENE, this.onStartScene, this)
    }

    private _preloadScenes(): void {
        const isMainMenuScene: boolean = this._cuttentScene === SceneType.MainMenu;
        const sceneToPreload: SceneType = isMainMenuScene ? SceneType.Game : SceneType.MainMenu;
        director.preloadScene(sceneToPreload);
    }

    private _startScene(sceneType: SceneType): void {
        if (this._isSceneStarting) return;

        this._isSceneStarting = true;
        const x: number = this._getOutBorderX();
        const { y, z } = this.canvasRoot.worldPosition;
        const worldPosition: Vec3 = new Vec3(x, y, z);
        const options: ITweenOption = {
            easing: 'expoIn',
            onComplete: () => {
                director.loadScene(sceneType);
            }
        }

        tween(this.canvasRoot)
            .to(this.changeSceneTweenDuration, { worldPosition }, options)
            .start();

        tween(this._canvasRootOpacicy)
            .to(this.changeSceneTweenDuration, { opacity: 0 }, { easing: 'expoIn' })
            .start();
    }

    private _revealScene(): void {
        if (StateManager.isInitLaunch) {
            StateManager.isInitLaunch = false;
            return;
        }

        const x: number = this._getOutBorderX();
        const { y, z } = this.canvasRoot.worldPosition;
        this.canvasRoot.setWorldPosition(x, y, z);
        this._canvasRootOpacicy.opacity = 0;

        tween(this.canvasRoot)
            .to(this.changeSceneTweenDuration, { worldPosition: Vec3.ZERO }, { easing: 'expoOut' })
            .start();

        tween(this._canvasRootOpacicy)
            .to(this.changeSceneTweenDuration, { opacity: 255 }, { easing: 'expoOut' })
            .start();
    }

    private _getOutBorderX(): number {
        const x: number = View.instance.getVisibleSizeInPixel().x;
        return this._cuttentScene === SceneType.MainMenu ? -x : x;
    }
	//#endregion

	//#region event handlers
    public onStartScene(sceneType: SceneType): void {
        this._startScene(sceneType);
    }
    //#endregion
}