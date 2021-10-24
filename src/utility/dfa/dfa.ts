import {IState, State} from "./state";
import {ITransition} from "./transition";
import {ISymbol} from "./symbol";

export interface IDfa {
    start: IState;
    transitions: Array<ITransition>;
    terminals: Array<IState>;
    states: Array<IState>;
    symbols: Array<ISymbol>;
    isTerminal: (state: IState) => boolean;
    transit: (state: IState, symbol: ISymbol) => IState;
    hasState: (state: IState) => boolean;
    canTransit: (state: IState, symbol: ISymbol) => boolean;
}
export class Dfa implements IDfa {

    start: IState;
    transitions: Array<ITransition>;
    terminals: Array<IState>;
    states: Array<IState>;
    symbols: Array<ISymbol>;

    constructor(
        start: IState,
        transitions: Array<ITransition>,
        terminals: Array<IState>,
        states: Array<IState>,
        symbols: Array<ISymbol>
    ) {
        this.start = start
        this.transitions = transitions
        this.terminals = terminals
        this.states = states
        this.symbols = symbols
    }

    public isTerminal(state: IState): boolean {
        let bool = false;
        for (let i = 0; i < this.terminals.length; i++) {
            if (this.terminals[i].isEqual(state)) {
                bool = true
                break
            }
        }
        return bool
    }

    public hasState(state: IState): boolean {
        let bool = false;
        for (let i = 0; i < this.states.length; i++) {
            if (this.states[i].isEqual(state)) {
                bool = true
                break
            }
        }
        return bool
    }

    public transit(state: IState, symbol: ISymbol): IState {
        for (let transition of this.transitions) {
            if (transition.start.isEqual(state) && transition.symbol.has(symbol)) {
                return transition.end
            }
        }
        return new State("")
    }

    public canTransit(state: IState, symbol: ISymbol): boolean {
        for (let transition of this.transitions) {
            if (transition.start.isEqual(state) && transition.symbol.has(symbol)) {
                return true
            }
        }
        return false
    }

}