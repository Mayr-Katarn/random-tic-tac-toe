import { log, _decorator, Component, Node, Prefab, UITransform, Vec3, instantiate, Widget, Size, Color } from 'cc';
import { GameEvent, gameEventTarget } from '../../EventEnums/GameEvents';
import Symbol from './Symbol';
import SymbolType from '../Enums/SymbolType';
import UiEventManager from '../../Managers/Events/UiEventManager';
import WinLine from './WinLine';
import { WinLineType } from '../Enums/WinLineType';

//#region classes-helpers
const { ccclass, property, menu } = _decorator;
//#endregion

@ccclass('GameField')
@menu('GameObjects/GameField/GameField')
export default class GameField extends Component {
    //#region editors fields and properties    
    @property({ type: Node })
    protected renderNode: Node = null;

    @property({ type: Node })
    protected winLineContainer: Node = null;

    @property({ type: Prefab })
    protected symbolPrefab: Prefab = null;

    @property({ type: Prefab })
    protected winLinePrefab: Prefab = null;

    @property
    protected fillFieldSpeed: number = 0.5;
    //#endregion

    //#region public fields and properties
    //#endregion

    //#region private fields and properties
    private readonly FIELD_GRID_SIZE: number = 3 as const;
    private readonly FIRST_SYMBOL: number = SymbolType.Cross;
    private _fieldSize: Size;
    private _offsetX: number;
    private _offsetY: number;
    private _startPosition: Vec3;
    private _winLine: WinLine;
    private _symbolPool: Symbol[] = [];
    private _symbolTurn: number;
    private _winner: number;
    private _turn: number = 0;
    private _isFilling: boolean = false;
    private _isChecked: boolean = true;
    //#endregion

	//#region life-cycle callbacks
    public onEnable(): void {
        this._eventListener(true);
    }

    public onDisable(): void {
        this._eventListener(false);
    }

    //#endregion

    //#region public methods
    public init(): void {
        this.getComponent(Widget).updateAlignment();
        this._calcStartPostion();
        this._createWinLine();
        this._createSymbolsPool();
    }
	//#endregion

	//#region private methods
    private _eventListener(isOn: boolean) {
        const func: string = isOn ? "on" : "off";
        gameEventTarget[func](GameEvent.FILL_FIELD, this.onFillField, this);
        gameEventTarget[func](GameEvent.CHECK_FIELD, this.onCheckField, this);
    }

    private _calcStartPostion(): void {
        this._fieldSize = this.getComponent(UITransform).contentSize;
        this._offsetX = this._fieldSize.width / this.FIELD_GRID_SIZE;
        this._offsetY = this._fieldSize.height / this.FIELD_GRID_SIZE;
        this._startPosition = new Vec3(-this._offsetX, -this._offsetY, this.node.position.z);
    }

    private _createWinLine(): void {
        this._winLine = instantiate(this.winLinePrefab).getComponent(WinLine);
        this._winLine.node.setParent(this.winLineContainer);
        this._winLine.hide();
    }

    private _createSymbolsPool(): void {
        for (let row = 0; row < this.FIELD_GRID_SIZE; row++) {
            for (let col = 0; col < this.FIELD_GRID_SIZE; col++) {
                const x: number = this._startPosition.x + (this._offsetX * col);
                const y: number = this._startPosition.y + (this._offsetY * row);
                const position: Vec3 = new Vec3(x, y, this.node.position.z);
                this._symbolPool.push(this._createSymbol(row, col, position));
            }
        }
    }

    private _createSymbol(row: number, col: number, position: Vec3): Symbol {
        const symbolNode: Node = instantiate(this.symbolPrefab);
        const symbol: Symbol = symbolNode.getComponent(Symbol);
        symbolNode.setParent(this.renderNode);
        symbol.init(row, col, position);
        return symbol;
    }

    private _fillField(): void {
        if (this._isFilling) return;
        this._resetField();
        const cellsSum: number = this.FIELD_GRID_SIZE * this.FIELD_GRID_SIZE;

        this.schedule(() => {
            this._setSymbol();
            this._checkWinner();
            this._changeSymbolTurn();
        }, this.fillFieldSpeed, cellsSum - 1);
    }

    private _resetField(): void {
        this._isFilling = true;
        this._isChecked = false;
        this._symbolTurn = this.FIRST_SYMBOL;
        this._turn = 0;
        this._winner = SymbolType.None;
        this._symbolPool.forEach(el => el.setSymbolType(SymbolType.None));
        this._winLine.hide();
        UiEventManager.sendWinnerMessage();
    }

    private _setSymbol(): void {
        const symbol: Symbol = this._getRandomFreeSymbol();
        symbol.setSymbolType(this._symbolTurn);
        symbol.playRevealAnimation();
    }

    private _getRandomFreeSymbol(): Symbol {
        const freeSymbols: Symbol[] = this._symbolPool.filter(el => el.symbolType === SymbolType.None);
        const index: number = Math.floor(Math.random() * freeSymbols.length);
        return freeSymbols[index];
    }

    private _changeSymbolTurn(): void {
        this._symbolTurn = this._symbolTurn === SymbolType.Cross ? SymbolType.Zero : SymbolType.Cross;
        this._turn++;
        this._isFilling = this._turn !== this._symbolPool.length;
    }

    private _checkWinner(): void {
        const activeSymbolsSum: number = this._symbolPool.filter(el => el.symbolType !== SymbolType.None).length;
        if (activeSymbolsSum < 5 || this._winner !== SymbolType.None) return;

        this._checkLines();

        if (this._winner === SymbolType.None) {
            this._checkCrossLines();
        }
    }

    private _checkLines(): void {
        for (let i = 0; i < this.FIELD_GRID_SIZE; i++) {
            const rowSymbols: Symbol[] = this._symbolPool.filter(el => el.row === i);
            const isRowWinner: boolean = rowSymbols.every(el => el.symbolType === this._symbolTurn);

            if (isRowWinner) {
                this._setWinner(WinLineType.Row, rowSymbols);
                return;
            }

            const colSymbols: Symbol[] = this._symbolPool.filter(el => el.col === i);
            const isColWinner: boolean = colSymbols.every(el => el.symbolType === this._symbolTurn);

            if (isColWinner) {
                this._setWinner(WinLineType.Col, colSymbols);
                return;
            }
        }
    }

    private _checkCrossLines(): void {
        const crossToRight = this._symbolPool.filter(el => el.row === el.col);
        const isCrossToRightWinner: boolean = crossToRight.every(el => el.symbolType === this._symbolTurn);

        if (isCrossToRightWinner) {
            this._setWinner(WinLineType.CrossToRight, crossToRight);
            return;
        }

        const crossToLeft = this._symbolPool.filter(el => el.row + el.col === 2);
        const isCrossToLeftWinner: boolean = crossToLeft.every(el => el.symbolType === this._symbolTurn);

        if (isCrossToLeftWinner) {
            this._setWinner(WinLineType.CrossToLeft, crossToLeft);
            return;
        }
    }

    private _setWinner(winLineType: WinLineType, symbolLineArr: Symbol[]): void {
        this._winner = this._symbolTurn;
        const firstSymbolPos: Vec3 = symbolLineArr[0].node.position;
        const lastSymbolPos: Vec3 = symbolLineArr[symbolLineArr.length - 1].node.position;
        const distance = Vec3.distance(firstSymbolPos, lastSymbolPos);
        this._winLine.setWinnerParams(winLineType, firstSymbolPos, distance);
    }

    private _checkField(): void {
        if (this._isChecked || this._isFilling) return;
        this._isChecked = true;
        this._setWinnerMsg();
        this._winLine.drowLine();
    }

    private _setWinnerMsg(): void {
        let msg: string;
        let color: Color;

        switch (this._winner) {
            case SymbolType.Cross:
                msg = 'крестики победили';
                color = this._symbolPool[0].crossColor;
                break;

            case SymbolType.Zero:
                msg = 'нолики победили';
                color = this._symbolPool[0].zeroColor;
                break;

            default: 
                msg = 'ничья';
                color = Color.BLACK; 
                break;
        }

        UiEventManager.sendWinnerMessage(msg, color);
    }
	//#endregion

	//#region event handlers
    public onFillField(): void {
        this._fillField();
    }

    public onCheckField(): void {
        this._checkField();
    }
    //#endregion
}