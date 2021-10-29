export interface IState {
    label: string;
    name: string;
    isEqual: (state: IState) => boolean
}

export class State implements IState{
    label: string;
    name: string;

    constructor(label: string, name?: string) {
        this.label = label
        this.name = name ? name : ""
    }

    public isEqual(state: IState): boolean {
        return this.label == state.label
    }

}