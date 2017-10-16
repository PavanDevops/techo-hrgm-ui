import { Training } from '../trainings.service';

export const ADD_TRAINING = 'ADD_TRAINING';
export const ADD_TRAININGS = 'ADD_TRAININGS';

export function trainings(trainings = [], action) {
    switch(action.type) {
        case ADD_TRAINING:
            return trainings.concat(action.payload);
        case ADD_TRAININGS:
            return [...action.payload];

    }
}