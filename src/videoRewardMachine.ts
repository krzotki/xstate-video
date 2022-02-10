import { createMachine } from "xstate";

type VideoRewardEvents = { type: 'BUTTON_CLICK' | 'START_VIDEO' | 'END_VIDEO' };

type VideoRewardStates = 
| { value: 'VIDEO_PAUSED'; context: undefined }
| { value: 'VIDEO_STARTED'; context: undefined }
| { value: 'VIDEO_ENDED'; context: undefined }
| { value: 'REWARD_RECEIVED'; context: undefined };

export const videoRewardMachine = createMachine<undefined, VideoRewardEvents, VideoRewardStates>({
    initial: 'VIDEO_PAUSED',
    id: 'video-reward',
    states: {
        'VIDEO_PAUSED': {
            on: {
                BUTTON_CLICK: 'VIDEO_STARTED',
                START_VIDEO: 'VIDEO_STARTED'
            }
        },
        'VIDEO_STARTED': {
            on: {
                END_VIDEO: 'VIDEO_ENDED',
                BUTTON_CLICK: 'VIDEO_PAUSED'
            }
        },
        'VIDEO_ENDED': {
            on: {
                BUTTON_CLICK: 'REWARD_RECEIVED'
            }
        },
        'REWARD_RECEIVED': {

        },
    }
});