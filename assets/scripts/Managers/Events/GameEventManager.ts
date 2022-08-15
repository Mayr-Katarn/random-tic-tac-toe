import { gameEventTarget, GameEvent } from "../../EventEnums/GameEvents";
import { SceneType } from "../../SceneType";

export default class GameEventManager {
    public static sendStartScene(sceneType: SceneType): void {
        gameEventTarget.emit(GameEvent.START_SCENE, sceneType);
    }

    public static sendFillField(): void {
        gameEventTarget.emit(GameEvent.FILL_FIELD);
    }

    public static sendCheckField(): void {
        gameEventTarget.emit(GameEvent.CHECK_FIELD);
    }
}