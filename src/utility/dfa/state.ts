export interface IState {
    label: string;
    isEqual: (state: IState) => boolean
}

export class State implements IState{
    label: string;

    constructor(label: string) {
        this.label = label
    }

    public isEqual(state: IState): boolean {
        return this.label == state.label
    }

}