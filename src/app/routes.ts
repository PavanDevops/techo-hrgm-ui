import { Routes } from '@angular/router';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TrainingsPageComponent } from './trainings-page/trainings-page.component';
import { CreateSubjectPageComponent } from './create-subject-page/create-subject-page.component';
import { WallOfFameComponent } from './wall-of-fame/wall-of-fame.component';

export const appRoutes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'subjects', component: SubjectsPageComponent },
    { path: 'subjects/create', component: CreateSubjectPageComponent },
    { path: 'trainings', component: TrainingsPageComponent },
    { path: 'wall-of-fame', component: WallOfFameComponent },
    { path: '**', redirectTo: '' }
];