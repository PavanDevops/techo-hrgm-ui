import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { 
  BehaviorSubject,
  Observable
} from 'rxjs';
import 'rxjs/add/operator/map';
import { AppState } from './reducers/index';
import { Store } from '@ngrx/store';

export interface Subject {
  id: string;
  name: string;
  skillId: string;
  skillName: string;
}

interface SubjectsOperation extends Function {
  (subjects: Subject[]): Subject[];
}

const BASE_URL = 'http://uat-hire.techolution.com:8086/json/subjects/';
//const BASE_URL = 'http://localhost:3000/subjects/'
const HEADER = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class SubjectsService {

  constructor(
    private http: Http,
    private store: Store<AppState>
  ) { 
  }

  create(payload: Subject): void {
    this.http.post(BASE_URL, payload)
             .map(res => res.json())
             .subscribe(subject => {
               this.store.dispatch({
                 type: "ADD_SUBJECT",
                 payload: subject
               })
             });
  }

  loadSubjects(): void {
    this.http.get(BASE_URL)
             .map(res => res.json() as Subject[] )
             .subscribe(subjects => {
                this.store.dispatch({
                  type: "ADD_SUBJECTS",
                  payload: subjects
                });
             });
  }

  remove(payload: Subject): void {
    this.http.delete(`${BASE_URL}${payload.id}`)
             .map(res => res.json())
             .subscribe(subject => {
               this.store.dispatch({
                  type: "DELETE_SUBJECT",
                  payload: subject
               })
             })
  }

  update(payload: Subject): void {
    this.http.put(`${BASE_URL}${payload.id}`, payload, { headers: HEADER })
             .map(res => res.json())
             .subscribe(subject => {
               this.store.dispatch({
                 type: "UPDATE_SUBJECT",
                 payload: subject
               })
    });
  }

}
