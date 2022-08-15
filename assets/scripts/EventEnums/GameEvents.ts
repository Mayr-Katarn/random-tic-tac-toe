import { Enum, EventTarget } from "cc";

export const gameEventTarget = new EventTarget();
export enum GameEvent {
    NONE,

    // Input
    INPUT,
    TOGGLE_INPUT_MANAGER,

    // Scene
    START_SCENE,

    // Field
    FILL_FIELD,
    CHECK_FIELD,
}