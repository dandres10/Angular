import { createMachine } from 'xstate';

export const playerMachine = (ref: any) => createMachine({
    id: 'player',
    initial: 'paused',
    context: { ref },
    states: {
        paused: {
            entry: "stop",
            on: {
                PLAY: "playing"
            }
        },
        playing: {
            entry: "play",
            on: {
                STOP: "paused"
            }
        }
    }
}, {
    actions: {
        play: (context) => {
            if (context.ref.current)
                context.ref.current.play()
        },
        stop: (context) => {
            if (context.ref.current)
                context.ref.current.pause()
        }
    }
});
