import {Dfa, IDfa} from "./utility/dfa/dfa";
import {State} from "./utility/dfa/state";
import {Transition} from "./utility/dfa/transition";
import {Symbol} from "./utility/dfa/symbol";
import {DfaRunner, IDfaRunner} from "./utility/dfa-runner";

let dfa: IDfa = new Dfa(
    new State("a"),
    [
        new Transition(
            new State("a"),
            new Symbol("1"),
            new State("b")
        ),
        new Transition(
            new State("b"),
            new Symbol("1"),
            new State("c")
        ),
        new Transition(
            new State("a"),
            new Symbol("2"),
            new State("c")
        )
    ],
    [
        new State("c")
    ],
    [
        new State("a"),
        new State("b"),
        new State("c")
    ],
    [
        new Symbol("1"),
        new Symbol("2")
    ]
)

let runner: IDfaRunner = new DfaRunner(dfa)

let items = ["1", "11", "12", "2", "21", "22"]
for (let item of items) {
    console.log(`--------------- Running for input ${item} ---------------`)
    runner.reset()
    let a = runner.run(item)
    console.log("accepted: ", a)
}


