import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { CreateSubjectComponent } from './create-subject/create-subject.component';

import { SkillsService } from './skills.service';
import { SubjectsService } from './subjects.service';
import { TrainingsService } from './trainings.service';
import { LoginComponent } from './login/login.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { appRoutes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SubjectsPageComponent } from './subjects-page/subjects-page.component';
import { reducers } from './reducers/index';

import {
  MatButtonToggleModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MdButtonModule,
  MdCheckboxModule,
  MdToolbarModule 
} from '@angular/material';
import { TrainingsPageComponent } from './trainings-page/trainings-page.component';
import { CreateTrainingComponent } from './create-training/create-training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { SubjectDetailComponent } from './subject-detail/subject-detail.component';
import { CreateSubjectPageComponent } from './create-subject-page/create-subject-page.component';
import { WallOfFameComponent } from './wall-of-fame/wall-of-fame.component';


@NgModule({
  declarations: [
    AppComponent,
    AssessmentComponent,
    CreateSubjectComponent,
    LoginComponent,
    SubjectListComponent,
    DashboardComponent,
    SubjectsPageComponent,
    TrainingsPageComponent,
    CreateTrainingComponent,
    TrainingListComponent,
    SubjectDetailComponent,
    CreateSubjectPageComponent,
    WallOfFameComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
    StoreModule.forRoot(reducers),
    MdButtonModule, 
    MdCheckboxModule,
    MdToolbarModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  providers: [ SkillsService, SubjectsService, TrainingsService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
