import { assign, Machine } from "xstate";

//#region Machine identifier
const idName = "water";
//#endregion

//#region Machine Interface
export interface IWaterMachine {
    states: {

        [STATES_WATER_MACHINE.liquid]: {};
        [STATES_WATER_MACHINE.ice]: {};
        [STATES_WATER_MACHINE.gas]: {};
        [STATES_WATER_MACHINE.plasma]: {};
    }
}
//#endregion

//#region Context

export enum CodeCountry {
    CO = 'CO',
    CL = 'CL',
    MX = 'MX'
}


interface IContextWater {
    country: CodeCountry;
    liquid: object;
    ice: object;
    gas: object;
    plasma: object;
}

let Context: IContextWater = {
    country: CodeCountry.CL,
    liquid: { state: false, title: 'Liquido' },
    ice: { state: false, title: 'Hielo' },
    gas: { state: false, title: 'Gaseoso' },
    plasma: { state: false, title: 'Plasma' }
};
//#endregion

//#region States
export enum STATES_WATER_MACHINE {
    init = 'init',
    liquid = 'liquid',
    ice = 'ice',
    gas = 'gas',
    plasma = 'plasma',
}
//#endregion

//#region Guards
export enum GUARDS_MACHINE {
    isCountryCL = 'isCountryCL',
    isCountryCO = 'isCountryCO',
    isCountryMX = 'isCountryMX'
}
//#endregion

//#region Transitions

export enum TRANSITIONS_WATER_MACHINE {
    HEAT = 'HEAT',
    FREEZE = 'FREEZE'
}

const liquidTransitions = {
    [TRANSITIONS_WATER_MACHINE.HEAT]: { target: STATES_WATER_MACHINE.gas, cond: GUARDS_MACHINE.isCountryCL },
    [TRANSITIONS_WATER_MACHINE.FREEZE]: { target: STATES_WATER_MACHINE.ice, cond: GUARDS_MACHINE.isCountryCL },
};

const iceTransitions = {
    [TRANSITIONS_WATER_MACHINE.HEAT]: { target: STATES_WATER_MACHINE.liquid, cond: GUARDS_MACHINE.isCountryCL },
};

const gasTransitions = {
    [TRANSITIONS_WATER_MACHINE.HEAT]: { target: STATES_WATER_MACHINE.plasma, cond: GUARDS_MACHINE.isCountryCL },
    [TRANSITIONS_WATER_MACHINE.FREEZE]: { target: STATES_WATER_MACHINE.liquid, cond: GUARDS_MACHINE.isCountryCL },
};

const plasmaTransitions = {
    [TRANSITIONS_WATER_MACHINE.FREEZE]: { target: STATES_WATER_MACHINE.gas, cond: GUARDS_MACHINE.isCountryCL },
};



export type WaterMachineEvent =
    | { type: TRANSITIONS_WATER_MACHINE.HEAT }
    | { type: TRANSITIONS_WATER_MACHINE.FREEZE };

//#endregion

//#region Actions

enum ACTIONS_WATER_MACHINE {

    goToLiquid = 'goToLiquid',
    goToIce = 'goToIce',
    goToGas = 'goToGas',
    goToPlasma = 'goToPlasma'
}
//#endregion


export const waterMachine = Machine<IContextWater, IWaterMachine, WaterMachineEvent>(
    {
        id: idName,
        initial: STATES_WATER_MACHINE.liquid,
        context: Context,
        states: {
            [STATES_WATER_MACHINE.liquid]: {
                entry: [ACTIONS_WATER_MACHINE.goToLiquid],
                on: liquidTransitions
            },
            [STATES_WATER_MACHINE.ice]: {
                entry: [ACTIONS_WATER_MACHINE.goToIce],
                on: iceTransitions
            },
            [STATES_WATER_MACHINE.gas]: {
                entry: [ACTIONS_WATER_MACHINE.goToGas],
                on: gasTransitions
            },
            [STATES_WATER_MACHINE.plasma]: {
                entry: [ACTIONS_WATER_MACHINE.goToPlasma],
                on: plasmaTransitions
            }
        }
    }, {
    // actions: {
    //     [ACTIONS_WATER_MACHINE.goToLiquid]: () => { },
    //     [ACTIONS_WATER_MACHINE.goToIce]: () => { },
    //     [ACTIONS_WATER_MACHINE.goToGas]: () => { },
    //     [ACTIONS_WATER_MACHINE.goToPlasma]: () => { }

    // },
    // actions: {
    //     [ACTIONS_WATER_MACHINE.goToLiquid]: assign(
    //         (context: IContextWater) => {
    //             let ctx = Context = { ...Context, country: context.country };
    //             return { ...ctx, liquid: { ...Context.liquid, state: true } };
    //         }
    //     ),
    //     [ACTIONS_WATER_MACHINE.goToIce]: assign(
    //         (context: IContextWater) => {
    //             let ctx = Context = { ...Context, country: context.country };
    //             return { ...ctx, ice: { ...Context.ice, state: true } };
    //         }
    //     ),
    //     [ACTIONS_WATER_MACHINE.goToGas]: assign(
    //         (context: IContextWater) => {
    //             let ctx = Context = { ...Context, country: context.country };
    //             return { ...ctx, gas: { ...Context.gas, state: true } };
    //         }
    //     ),
    //     [ACTIONS_WATER_MACHINE.goToPlasma]: assign(
    //         (context: IContextWater) => {
    //             let ctx = Context = { ...Context, country: context.country };
    //             return { ...ctx, plasma: { ...Context.plasma, state: true } };
    //         }
    //     )

    // },
    guards: {
        [GUARDS_MACHINE.isCountryCL]: context => context.country === CodeCountry.CL,
        [GUARDS_MACHINE.isCountryCO]: context => context.country === CodeCountry.CO,
        [GUARDS_MACHINE.isCountryMX]: context => context.country === CodeCountry.MX
    }
}
);


