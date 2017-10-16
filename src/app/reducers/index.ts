import { subjects } from './subjects';
import { skills } from './skills';
import { trainings } from './trainings';
import {
    ActionReducerMap,
    MetaReducer,
} from '@ngrx/store';
import { Subject } from '../subjects.service';
import { Training } from '../trainings.service';
import { Skill } from '../skills.service';

export interface AppState {
    skills: Skill[],
    subjects: Subject[],
    trainings: Training[]
}

export const reducers: ActionReducerMap<AppState> = {
    skills: skills,
    subjects: subjects,
    trainings: trainings
};