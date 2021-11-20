import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { StateNode, State, EventObject, DefaultContext } from "xstate";

export interface IActionsMachine {
    [dinamycAction: string]: (args?: any) => void
}

@Injectable({
    providedIn: 'root'
})
export class ManagerMachine {

    private machine: any;
    private buildMachine!: StateNode;
    private actions?: IActionsMachine;
    private state: any;
    private state$!: BehaviorSubject<State<DefaultContext, EventObject>>;

    constructor() { }

    initMachine(
        machine: any,
        context: any,
        actions?: IActionsMachine) {
        this.machine = machine;
        this.buildMachine = this.machine.withContext(context);
        this.actions = actions;
        this.state = this.buildMachine.initialState;
        this.state$ = new BehaviorSubject<State<DefaultContext, EventObject>>(this.buildMachine.initialState);
    }

    private runActions(state: any, context?: any) {
        if (state.actions.length > 0)
            state.actions.forEach((f: any) => this.actions && this.actions[f.type](context));
    }

    transition(eventType: any, ctx?: any) {
        if (!this.buildMachine) return
        const newState =
            this.buildMachine.transition(this.state.value, eventType, { ...this.state.context, ...ctx });
        this.state$.next(newState);
        this.state = newState;
        this.runActions(newState, ctx);
    }

    getState() {
        return this.state$ ?? null
    }


}