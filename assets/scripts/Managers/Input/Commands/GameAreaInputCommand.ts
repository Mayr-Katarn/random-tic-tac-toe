import { _decorator, Touch } from 'cc';
import InputCatcher from '../InputCatcher';
import InputManager from '../InputManager';
import IInputCommand from './IInputCommand';

export default class GameAreaInputCommand extends IInputCommand {
    constructor(manager: InputManager) {
		super(manager);
	}

	public onDown(touch: Touch, place: InputCatcher): void {}

	public onMove(touch: Touch, place: InputCatcher): void {}

	public onUp(touch: Touch, place: InputCatcher): void {}
}

