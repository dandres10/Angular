
import { createMachine } from 'xstate';

export const waterMachine = createMachine({
    id: 'water',
    initial: 'liquid',
    states: {
        ice: {
            on: {
                HEAT: {
                    target: "liquid"
                }
            }
        },
        liquid: {
            on: {
                HEAT: {
                    target: "gas"
                },
                FREEZE: {
                    target: "ice"
                }
            }
        },
        gas: {
            on: {
                HEAT: {
                    target: "plasma"
                },
                FREEZE: {
                    target: "liquid"
                }
            }
        },
        plasma: {
            on: {
                FREEZE: {
                    target: "gas"
                }
            }
        }
    }
});



