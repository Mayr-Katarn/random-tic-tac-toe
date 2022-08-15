import { _decorator, Node, Touch } from 'cc';
import CheckFieldButton from '../../../Ui/Buttons/CheckFieldButton';
import FillFieldButton from '../../../Ui/Buttons/FillFieldButton';
import RetornToMainMenuButton from '../../../Ui/Buttons/RetornToMainMenuButton';
import StartGameButton from '../../../Ui/Buttons/StartGameButton';
import InputDirection from '../Enums/InputDirection';
import UiAreaCommandType from '../Enums/UiAreaCommandType';
import InputCatcher from '../InputCatcher';
import InputManager from '../InputManager';
import IInputCommand from './IInputCommand';

export default class UiAreaInputCommand extends IInputCommand {
	constructor(manager: InputManager) {
		super(manager);
	}

	public onDown(touch: Touch, place: InputCatcher): void {
		const inputCatcher: InputCatcher = place.node.getComponent(InputCatcher);
		
		if (inputCatcher?.direction === InputDirection.UiArea) {
			switch (inputCatcher.uiAreaCommandType) {
				case UiAreaCommandType.StartGame:
					place.node.getComponent(StartGameButton).onTouchDown();
					break;

				case UiAreaCommandType.ReturnToMainMenu:
					place.node.getComponent(RetornToMainMenuButton).onTouchDown();
					break;
					
				case UiAreaCommandType.FillField:
					place.node.getComponent(FillFieldButton).onTouchDown();
					break;

				case UiAreaCommandType.CheckField:
					place.node.getComponent(CheckFieldButton).onTouchDown();
					break;
			}
		}
	}

	public onMove(touch: Touch, place: InputCatcher): void {
		const inputCatcher: InputCatcher = place.node.getComponent(InputCatcher);
		
		if (inputCatcher?.direction === InputDirection.UiArea) {
			switch (inputCatcher.uiAreaCommandType) {
				case UiAreaCommandType.StartGame:
					place.node.getComponent(StartGameButton).onTouchMove();
					break;

				case UiAreaCommandType.ReturnToMainMenu:
					place.node.getComponent(RetornToMainMenuButton).onTouchMove();
					break;
					
				case UiAreaCommandType.FillField:
					place.node.getComponent(FillFieldButton).onTouchMove();
					break;

				case UiAreaCommandType.CheckField:
					place.node.getComponent(CheckFieldButton).onTouchMove();
					break;
			}
		}
	}

	public onUp(touch: Touch, place: InputCatcher): void {
		const inputCatcher: InputCatcher = place.node.getComponent(InputCatcher);
		
		if (inputCatcher?.direction === InputDirection.UiArea) {
			switch (inputCatcher.uiAreaCommandType) {
				case UiAreaCommandType.StartGame:
					place.node.getComponent(StartGameButton).onTouchUp();
					break;

				case UiAreaCommandType.ReturnToMainMenu:
					place.node.getComponent(RetornToMainMenuButton).onTouchUp();
					break;
					
				case UiAreaCommandType.FillField:
					place.node.getComponent(FillFieldButton).onTouchUp();
					break;

				case UiAreaCommandType.CheckField:
					place.node.getComponent(CheckFieldButton).onTouchUp();
					break;
			}
		}
	}

	public onCancel(touch: Touch, place: InputCatcher): void {
		const inputCatcher: InputCatcher = place.node.getComponent(InputCatcher);
		
		if (inputCatcher?.direction === InputDirection.UiArea) {
			switch (inputCatcher.uiAreaCommandType) {
				case UiAreaCommandType.StartGame:
					place.node.getComponent(StartGameButton).onTouchCancel();
					break;

				case UiAreaCommandType.ReturnToMainMenu:
					place.node.getComponent(RetornToMainMenuButton).onTouchCancel();
					break;

				case UiAreaCommandType.FillField:
					place.node.getComponent(FillFieldButton).onTouchCancel();
					break;

				case UiAreaCommandType.CheckField:
					place.node.getComponent(CheckFieldButton).onTouchCancel();
					break;
			}
		}
	}
}
