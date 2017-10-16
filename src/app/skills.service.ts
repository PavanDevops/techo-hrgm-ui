import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { AppState } from './reducers';
import 'rxjs/add/operator/map';


export interface Skill {
  id: string;
  name: string;
}

const BASE_URL = 'http://uat-hire.techolution.com:8082/json/skills';
//const BASE_URL = 'http://localhost:3000/skills';
const HEADER = new Headers({ 'Content-Type': 'application/json' });

@Injectable()
export class SkillsService {

  constructor(
    private http: Http,
    private store: Store<AppState>
  ) { }

  loadSkills() {
    this.http.get(BASE_URL)
             .map(res => res.json())
             .subscribe(skills => {
               this.store.dispatch({
                 type: 'ADD_SKILLS',
                 payload: skills
               });
             });
  }

}

