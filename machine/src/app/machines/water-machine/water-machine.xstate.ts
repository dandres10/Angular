import { createMachine } from "xstate";

//#region Machine identifier
const idName = "water";
//#endregion

//#region Context
interface IContext {
    liquid: boolean;
    ice: boolean;
    gas: boolean;
    plasma: boolean;
}

const Context: IContext = {
    liquid: false,
    ice: false,
    gas: false,
    plasma: false,
};
//#endregion

//#region States
export enum STATES_WATER_MACHINE {
    liquid = "liquid",
    ice = "ice",
    gas = "gas",
    plasma = "plasma",
}
//#endregion

//#region Transitions

export enum TRANSITIONS{
    HEAT = 'HEAT',
    FREEZE = 'FREEZE'
}

const liquidTransitions = {
    HEAT: { target: STATES_WATER_MACHINE.gas },
    FREEZE: { target: STATES_WATER_MACHINE.ice },
};

const iceTransitions = {
    HEAT: { target: STATES_WATER_MACHINE.liquid },
};

const gasTransitions = {
    HEAT: { target: STATES_WATER_MACHINE.plasma },
    FREEZE: { target: STATES_WATER_MACHINE.liquid },
};

const plasmaTransitions = {
    FREEZE: { target: STATES_WATER_MACHINE.gas },
};
//#endregion

//#region Actions

enum ACTIONS_WATER_MACHINE {
    goToLiquid = 'goToLiquid',
    goToIce = 'goToIce',
    goToGas = 'goToGas',
    goToPlasma = 'goToPlasma'
}
//#endregion
export const waterMachine = createMachine<IContext>({
    id: idName,
    initial: STATES_WATER_MACHINE.liquid,
    context: Context,
    states: {
        liquid: {
            entry: [ACTIONS_WATER_MACHINE.goToLiquid],
            on: liquidTransitions
        },
        ice: {
            entry: [ACTIONS_WATER_MACHINE.goToIce],
            on: iceTransitions
        },
        gas: {
            entry: [ACTIONS_WATER_MACHINE.goToGas],
            on: gasTransitions
        },
        plasma: {
            entry: [ACTIONS_WATER_MACHINE.goToPlasma],
            on: plasmaTransitions
        }
    }
});