import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MachineState } from 'src/app/machines/water-machine/water-machine.class';
import { CodeCountry, TRANSITIONS_WATER_MACHINE, waterMachine } from 'src/app/machines/water-machine/water-machine.xstate';
import { StateValue } from 'xstate';

@Component({
  selector: 'app-water-state-manager',
  templateUrl: './water-state-manager.component.html',
  styleUrls: ['./water-state-manager.component.scss']
})
export class WaterStateManagerComponent implements OnInit {

  private sub1!: Subscription;
  private sub2!: Subscription;
  stateMachine!: StateValue;


  constructor(public mangerMachine: MachineState) { }

  ngOnInit(): void {
    this.sub1 = new Observable(subscriber => {
      subscriber.next(this.buildMachine());
      subscriber.complete();
    }).subscribe();


  }

  HEAT() {
    this.mangerMachine.transition(TRANSITIONS_WATER_MACHINE.HEAT);
  }

  FREEZE() {
    this.mangerMachine.transition(TRANSITIONS_WATER_MACHINE.FREEZE);
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
        country: CodeCountry.CL,
        liquid: { state: false, title: 'Liquido' },
        ice: { state: false, title: 'Hielo' },
        gas: { state: false, title: 'Gaseoso' },
        plasma: { state: false, title: 'Plasma' }
      }
      , machineActions);
  }


  private goToLiquid() {
    console.log('realizar algun proceso relacionado cuando esta en este estado Liquido');
  }
  private goToIce() {
    console.log('realizar algun proceso relacionado cuando esta en este estado de Hielo');
  }
  private goToGas() {
    console.log('realizar algun proceso relacionado cuando esta en este estado de Gas');
  }
  private goToPlasma() {
    console.log(`realizar algun proceso relacionado cuando esta en estado de Plasma`);
  }


}
