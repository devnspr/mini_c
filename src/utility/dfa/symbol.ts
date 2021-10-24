
export interface ISymbol {
    item: string | Array<string>;
    has: (symbol: ISymbol) => boolean;
}

export class Symbol implements ISymbol {
    item: string | Array<string>
    constructor(item: string | Array<string>) {
        this.item = item
    }

    public has(symbol: ISymbol) {
        if (typeof symbol.item == "string") {
            if (typeof this.item == "string") return symbol.item == this.item;
            else {
                return this.item.indexOf(symbol.item) >= 0
            }
        } else {
            if (typeof this.item == "string") return false;
            else {
                return symbol.item.every((i: string) => this.item.indexOf(i) >= 0)
            }
        }
    }
}