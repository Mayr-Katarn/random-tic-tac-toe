import { Color } from "cc";
import { UiEvent, uiEventTarget } from "../../EventEnums/UiEvents";

export default class UiEventManager {
    public static sendWinnerMessage(msg: string = '', color: Color = Color.WHITE): void {
        uiEventTarget.emit(UiEvent.SET_WINNER_MSG, msg, color);
    }
}