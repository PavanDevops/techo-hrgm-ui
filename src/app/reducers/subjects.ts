import { Subject } from '../subjects.service';

export const ADD_SUBJECT = 'ADD_SUBJECT';
export const ADD_SUBJECTS = 'ADD_SUBJECTS';
export const DELETE_SUBJECT = 'DELETE_SUBJECT';
export const UPDATE_SUBJECT = 'UPDATE_SUBJECT';

export function subjects(subjects = [], action) {
    switch(action.type) {
        case ADD_SUBJECT:
            return subjects.concat(action.payload);
        case ADD_SUBJECTS:
            return [...action.payload];
        case DELETE_SUBJECT:
            return subjects.filter(subject => action.payload.id !== subject.id );
        case UPDATE_SUBJECT:
            return subjects.map(sub => {
                if (sub.id === action.payload.id) {
                    return Object.assign({}, action.payload);
                } else {
                    return sub;
                }
            });
        default:
            return [...subjects];

    }
}