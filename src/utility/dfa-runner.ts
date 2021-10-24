import {IDfa} from "./dfa/dfa";
import {IState} from "./dfa/state";
import {ISymbol, Symbol} from "./dfa/symbol";

export interface IDfaRunner {
    dfa: IDfa;
    currentState: IState;
    run: (input: string) => boolean;
    reset: () => void;
}

export class DfaRunner implements IDfaRunner {
    currentState: IState;
    dfa: IDfa;

    constructor(dfa: IDfa) {
        this.dfa = dfa
        this.currentState = dfa.start
    }

    public run(input: string): boolean {
        for (let i = 0; i < input.length; i++) {
            let char = input.charAt(i)
            console.log("running for char "+ char)
            let symbol: ISymbol = new Symbol(char)
            if (this.dfa.canTransit(this.currentState, symbol)) {
                let temp = this.currentState.label
                this.currentState = this.dfa.transit(this.currentState, symbol)
                console.log(`transited from ${temp} to ${this.currentState.label} using symbol ${char}`)
            } else {
                console.log(`cant transit from ${this.currentState.label} using symbol ${char}`)
                return false
            }
        }
        return this.dfa.isTerminal(this.currentState)
    }

    public reset() {
        this.currentState = this.dfa.start
    }

}