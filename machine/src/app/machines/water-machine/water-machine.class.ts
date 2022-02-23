import {
    StateMachine,
    State,
    EventObject,
    DefaultContext,
    interpret
} from 'xstate';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface IActionsMachine {
    [dinamycAction: string]: (args?: any) => void;
}

export abstract class IMachineState {
    public context: any;
    public state: any;
    public state$: any;
    abstract initMachine(
        machine: StateMachine<any, any, any>,
        context: any,
        actions?: IActionsMachine
    ): void;
    abstract transition(eventType: any, ctx?: any): void;
}

@Injectable({
    providedIn: 'root'
})
export class MachineState implements IMachineState {
    public state!: State<DefaultContext, EventObject>;
    public context: any;
    private serviceMachine: any;
    public state$: any;

    constructor() { }

    initMachine(
        machine: StateMachine<any, any, any>,
        context?: any,
        actions?: IActionsMachine
    ) {
        context
            ? this.buildMachine(machine.withContext(context), actions)
            : this.buildMachine(machine, actions);
    }

    buildMachine(machine: any, actions?: IActionsMachine) {
        this.serviceMachine = interpret(machine)
            .onTransition((state: any) => {
                this.context = state.context;
                this.state = state;
                this.state$ = new BehaviorSubject<State<DefaultContext, EventObject>>(
                    this.state
                );

                actions && this.runActions(this.state, this.context, actions);
                 state && this.print(state);
            })
            .start();
    }

    transition(eventType: string) {
        this.serviceMachine?.send?.(eventType);
    }

    private print(state: any) {
        if (!state) return;
        console.log(`--Machine Inicio.`);
        console.log('Machine: ', state?.machine?.key);
        console.log('State: ', state?.value === Object ? state : state?.value);
        console.log('Contexto:', this.context);
        console.log(
            'Transición:',
            state?.transitions?.[0] ? state?.transitions?.[0]?.event : 'default'
        );
        console.log(`--Machine Fin`);
        console.log('\n');
    }

    private runActions(state: any, context?: any, actions?: IActionsMachine) {
        if (state.actions.length > 0)
            state.actions.forEach((f: any) => actions && actions[f.type](context));
    }
}
