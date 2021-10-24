import {IState, State} from "./state";
import {ISymbol, Symbol} from "./symbol";

export interface ITransition {
    start: State;
    end: State;
    symbol: Symbol;
}

export class Transition implements ITransition{
    start: State
    end: State
    symbol: Symbol

    constructor(start: State, symbol: Symbol, end: State) {
        this.start = start
        this.symbol = symbol
        this.end = end
    }
}