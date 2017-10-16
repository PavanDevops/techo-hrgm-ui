import { Skill } from '../skills.service';

export const ADD_SKILLS = 'ADD_SKILLS';

export function skills(skills = [], action) {
    switch(action.type) {
        case ADD_SKILLS:
            return [...action.payload];
        default: 
            return [...skills];
    }
}