import { Enum, EventTarget } from "cc";

export const uiEventTarget = new EventTarget();
export enum UiEvent {
    NONE,

    SET_WINNER_MSG,
}