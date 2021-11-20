import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ManagerMachine } from 'src/app/machines/water-machine/water-machine.class';
import { STATES_WATER_MACHINE, TRANSITIONS, waterMachine } from 'src/app/machines/water-machine/water-machine.xstate';
import { interpret, StateValue } from 'xstate';

@Component({
  selector: 'app-water-state-manager',
  templateUrl: './water-state-manager.component.html',
  styleUrls: ['./water-state-manager.component.scss']
})
export class WaterStateManagerComponent implements OnInit {

  private sub1!: Subscription;
  private sub2!: Subscription;
  stateMachine!: StateValue;


  constructor(private mangerMachine: ManagerMachine) { }

  ngOnInit(): void {
    this.sub1 = new Observable(subscriber => {
      subscriber.next(this.buildMachine());
      subscriber.next(this.currentStateMachine());
      subscriber.next(this.mangerMachine.transition(TRANSITIONS.HEAT));
      subscriber.next(this.mangerMachine.transition(TRANSITIONS.FREEZE));
      subscriber.next(this.mangerMachine.transition(TRANSITIONS.FREEZE));
      subscriber.next(this.mangerMachine.transition(TRANSITIONS.HEAT));
      subscriber.next(this.mangerMachine.transition(TRANSITIONS.HEAT));
      subscriber.complete();
    }).subscribe();


  }

  currentStateMachine() {
    this.sub2 =
      this.mangerMachine.getState().subscribe((data) => { this.stateMachine = data.value; console.log(this.stateMachine) });
  }

  HEAT() {
    this.mangerMachine.transition(TRANSITIONS.HEAT)
  }

  FREEZE() {
    this.mangerMachine.transition(TRANSITIONS.FREEZE);
  }


  ngOnDestroy(): void {
    this.sub1.unsubscribe()
    this.sub2.unsubscribe()
  }


  buildMachine() {
    const machineActions = {
      goToLiquid: this.goToLiquid.bind(this),
      goToIce: this.goToIce.bind(this),
      goToGas: this.goToGas.bind(this),
      goToPlasma: this.goToPlasma.bind(this)
    }
    this.mangerMachine.initMachine(waterMachine,
      {
        liquid: false,
        ice: false,
        gas: false,
        plasma: false,
      }, machineActions);
  }


  private goToLiquid() {
    console.log('realizar algun proceso relacionado cuando esta en este estado Liquido')
  }
  private goToIce() {
    console.log('realizar algun proceso relacionado cuando esta en este estado de Hielo')
  }
  private goToGas() {
    console.log('realizar algun proceso relacionado cuando esta en este estado de Gas')
  }
  private goToPlasma() {
    console.log(`realizar algun proceso relacionado cuando esta en estado de Plasma`)
  }


  waterMachine = () => {
    const promiseService = interpret(waterMachine)
      .onTransition((state) => console.log(state.value));

    promiseService.start();
    // promiseService.send({ type: 'HEAT' });
    // promiseService.send({ type: 'HEAT' });
    // promiseService.send({ type: 'FREEZE' });
    // promiseService.send({ type: 'FREEZE' });

  }



}
