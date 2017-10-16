import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AppState } from './reducers/index';
import { Store } from '@ngrx/store';

export interface Training {
  id: number;
  category: string;
  name: string;
  type: string;
}

const BASE_URL = 'http://uat-hire.techolution.com:8086/json/trainings';
const HEADER = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class TrainingsService {

  constructor(
    private http: Http,
    private store: Store<AppState>
  ) { }

  create(payload: Training): void {
    this.http.post(BASE_URL, payload, { headers: HEADER})
             .map(res => res.json())
             .subscribe(training => {
               this.store.dispatch({
                 type: "ADD_TRAINING",
                 payload: training
               })
             });
  }

  loadTrainings(): void {
    this.http.get(BASE_URL)
             .map(res => res.json() as Training[] )
             .subscribe(trainings => {
                this.store.dispatch({
                  type: "ADD_TRAININGS",
                  payload: trainings
                });
             });
  }

}
