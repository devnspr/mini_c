import {Dfa, IDfa} from "./utility/dfa/dfa";
import {State} from "./utility/dfa/state";
import {Transition} from "./utility/dfa/transition";
import {Symbol} from "./utility/dfa/symbol";
import {DfaRunner, IDfaRunner} from "./utility/dfa-runner";

let digits: Array<string> = []
for (let i = 48; i<= 57; i++) digits.push(String.fromCharCode(i))
let characters: Array<string> = ['_']
for (let i = 65; i <= 90; i++) characters.push(String.fromCharCode(i))
for (let i = 97; i <= 122; i++) characters.push(String.fromCharCode(i))
const charactersAndDigits = characters.concat(digits)
let startToIdNo = ['w','e','f','i']
let startToId: Array<string> = characters.slice()
for (let i = 0; i < startToIdNo.length; i++) {
    startToId.splice(startToId.indexOf(startToIdNo[i]), 1)
}
const startToW = 'w'
let wToId = charactersAndDigits.slice()
wToId.splice(charactersAndDigits.indexOf('h'), 1)
const wToWh = 'h'
let whToId = charactersAndDigits.slice()
whToId.splice(charactersAndDigits.indexOf('i'), 1)
const whToWhi = 'i'
let whiToId = charactersAndDigits.slice()
whiToId.splice(charactersAndDigits.indexOf('l'), 1)
const whiToWhil = 'l'
let whilToId = charactersAndDigits.slice()
whilToId.splice(charactersAndDigits.indexOf('e'), 1)
const whilToWhile = 'e'
const whileTiId = charactersAndDigits.slice()
const startToE = 'e'
let eToId = charactersAndDigits.slice()
eToId.splice(charactersAndDigits.indexOf('l'), 1)
const eToEl = 'l'
let elToId = charactersAndDigits.slice()
elToId.splice(charactersAndDigits.indexOf('s'), 1)
const elToEls = 's'
let elsToId = charactersAndDigits.slice()
elsToId.splice(charactersAndDigits.indexOf('e'), 1)
const elsToElse = 'e'
const elseToId = charactersAndDigits.slice()
const startToF = 'f'
let fToId = charactersAndDigits.slice()
fToId.splice(charactersAndDigits.indexOf('o'), 1)
const fToFo = 'o'
let foToId = charactersAndDigits.slice()
foToId.splice(charactersAndDigits.indexOf('r'), 1)
const foToFor = 'r'
const forToId = charactersAndDigits.slice()
const startToI = 'i'
let iToId = charactersAndDigits.slice()
iToId.splice(charactersAndDigits.indexOf('f'), 1)
const iToIf = 'f'
const ifToId = charactersAndDigits.slice()
const startToPlus = '+'
const startToEq = '='
const startToOP = '('
const OPToANY = charactersAndDigits.slice()
const ANYToCP = ')'

const symbols = {
    START_TO_DIGIT: new Symbol(digits),
    START_TO_ID: new Symbol(startToId),
    START_TO_W: new Symbol(startToW),
    START_TO_E: new Symbol(startToE),
    START_TO_F: new Symbol(startToF),
    START_TO_I: new Symbol(startToI),
    START_TO_PLUS: new Symbol(startToPlus),
    START_TO_EQ: new Symbol(startToEq),
    START_TO_OP: new Symbol(startToOP),
    DIGIT_TO_DIGIT: new Symbol(digits),
    OP_TO_OP: new Symbol(OPToANY),
    OP_TO_CP: new Symbol(ANYToCP),
    W_TO_ID: new Symbol(wToId),
    W_TO_WH: new Symbol(wToWh),
    WH_TO_ID: new Symbol(whToId),
    WH_TO_WHI: new Symbol(whToWhi),
    WHI_TO_ID: new Symbol(whiToId),
    WHI_TO_WHIL: new Symbol(whiToWhil),
    WHIL_TO_ID: new Symbol(whilToId),
    WHIL_TO_WHILE: new Symbol(whilToWhile),
    WHILE_TO_ID: new Symbol(whileTiId),
    E_TO_EL: new Symbol(eToEl),
    E_TO_ID: new Symbol(eToId),
    EL_TO_ELS: new Symbol(elToEls),
    EL_TO_ID: new Symbol(elToId),
    ELS_TO_ID: new Symbol(elsToId),
    ELS_TO_ELSE: new Symbol(elsToElse),
    ELSE_TO_ID: new Symbol(elseToId),
    F_TO_ID: new Symbol(fToId),
    F_TO_FO: new Symbol(fToFo),
    FO_TO_ID: new Symbol(foToId),
    FO_TO_FOR: new Symbol(foToFor),
    FOR_TO_ID: new Symbol(forToId),
    I_TO_ID: new Symbol(iToId),
    I_TO_IF: new Symbol(iToIf),
    IF_TO_ID: new Symbol(ifToId),
    ID_TO_ID: new Symbol(charactersAndDigits),
}

enum names {
    ID = "identifier",
    KEY = "keyword",
    DIGIT = "digit",
    OP = "operand",
    P = "parantesis"
}

const states = {
    START: new State("start"),
    W: new State("w", names.ID),
    WH: new State("wh", names.ID),
    WHI: new State("whi", names.ID),
    WHIL: new State("whil", names.ID),
    WHILE: new State("while", names.KEY),
    ID: new State("identifier", names.ID),
    DIGIT: new State("digits", names.DIGIT),
    E: new State("e", names.ID),
    EL: new State("el", names.ID),
    ELS: new State("els", names.ID),
    ELSE: new State("else", names.KEY),
    F: new State("f", names.ID),
    FO: new State("fo", names.ID),
    FOR: new State("for", names.KEY),
    I: new State("i", names.ID),
    IF: new State("if", names.KEY),
    PLUS: new State("+", names.OP),
    EQ: new State("=", names.OP),
    OP: new State("("),
    CP: new State(")", names.P)
}

let terminals: Array<State> = []
for (let key of Object.keys(states)) {
    if (key != "START" && key != "OP") {
        // @ts-ignore
        terminals.push(states[key])
    }
}

let allStates: Array<State> = []
for (let key of Object.keys(states)) {
    // @ts-ignore
    allStates.push(states[key])
}
let dfa: IDfa = new Dfa(
    new State("start", "start"),
    [
        new Transition(
            states.START,
            symbols.START_TO_DIGIT,
            states.DIGIT
        ),
        new Transition(
            states.START,
            symbols.START_TO_ID,
            states.ID
        ),
        new Transition(
            states.START,
            symbols.START_TO_W,
            states.W
        ),
        new Transition(
            states.START,
            symbols.START_TO_E,
            states.E
        ),
        new Transition(
            states.START,
            symbols.START_TO_F,
            states.F
        ),
        new Transition(
            states.START,
            symbols.START_TO_I,
            states.I
        ),
        new Transition(
            states.START,
            symbols.START_TO_PLUS,
            states.PLUS
        ),
        new Transition(
            states.START,
            symbols.START_TO_EQ,
            states.EQ
        ),
        new Transition(
            states.START,
            symbols.START_TO_OP,
            states.OP
        ),
        new Transition(
            states.DIGIT,
            symbols.DIGIT_TO_DIGIT,
            states.DIGIT
        ),
        new Transition(
            states.W,
            symbols.W_TO_ID,
            states.ID
        ),
        new Transition(
            states.W,
            symbols.W_TO_WH,
            states.WH
        ),
        new Transition(
            states.WH,
            symbols.WH_TO_ID,
            states.ID
        ),
        new Transition(
            states.WH,
            symbols.WH_TO_WHI,
            states.WHI
        ),
        new Transition(
            states.WHI,
            symbols.WHI_TO_ID,
            states.ID
        ),
        new Transition(
            states.WHI,
            symbols.WHI_TO_WHIL,
            states.WHIL
        ),
        new Transition(
            states.WHIL,
            symbols.WHIL_TO_ID,
            states.ID
        ),
        new Transition(
            states.WHIL,
            symbols.WHIL_TO_WHILE,
            states.WHILE
        ),
        new Transition(
            states.WHILE,
            symbols.WHILE_TO_ID,
            states.ID
        ),
        new Transition(
            states.E,
            symbols.E_TO_EL,
            states.EL
        ),
        new Transition(
            states.E,
            symbols.E_TO_ID,
            states.ID
        ),
        new Transition(
            states.EL,
            symbols.EL_TO_ELS,
            states.ELS
        ),
        new Transition(
            states.EL,
            symbols.EL_TO_ID,
            states.ID
        ),
        new Transition(
            states.ELS,
            symbols.ELS_TO_ID,
            states.ID
        ),
        new Transition(
            states.ELS,
            symbols.ELS_TO_ELSE,
            states.ELSE
        ),
        new Transition(
            states.ELSE,
            symbols.ELSE_TO_ID,
            states.ID
        ),
        new Transition(
            states.F,
            symbols.F_TO_ID,
            states.ID
        ),
        new Transition(
            states.F,
            symbols.F_TO_FO,
            states.FO
        ),
        new Transition(
            states.FO,
            symbols.FO_TO_ID,
            states.ID
        ),
        new Transition(
            states.FO,
            symbols.FO_TO_FOR,
            states.FOR
        ),
        new Transition(
            states.FOR,
            symbols.FOR_TO_ID,
            states.ID
        ),
        new Transition(
            states.I,
            symbols.I_TO_ID,
            states.ID
        ),
        new Transition(
            states.I,
            symbols.I_TO_IF,
            states.IF
        ),
        new Transition(
            states.IF,
            symbols.IF_TO_ID,
            states.ID
        ),
        new Transition(
            states.OP,
            symbols.OP_TO_OP,
            states.OP
        ),
        new Transition(
            states.OP,
            symbols.OP_TO_CP,
            states.CP
        ),
        new Transition(
            states.ID,
            symbols.ID_TO_ID,
            states.ID
        )
    ],
    terminals,
    allStates
)

let runner: IDfaRunner = new DfaRunner(dfa)

let t1 = `name = "mohammad";`


scan(t1)

function scan(text: string) {
    console.log("Scanning: ", text)
    let text2: string = text.split(" ").join()
    text2 = text2.split("\n").join()
    text2 = text2.split("\t").join()
    while(text2 != "") {
        runner.reset()
        let lastAcceptedToken: string = "";
        let lastAcceptedType: string = "";
        for (let char of text2) {
            let result = runner.run(char)
            if (result.accepted) {
                lastAcceptedToken += char
                lastAcceptedType = result.label
            } else {
                if (result.label == "NO_TRANSIT") {
                    break
                }
            }
        }
        if (lastAcceptedToken.length > 0){
            console.log(`<${lastAcceptedToken}> : <${lastAcceptedType}>`)
            text2 = text2.substring(lastAcceptedToken.length, text2.length);
        } else text2 = text2.substring(1, text2.length)
    }
}
