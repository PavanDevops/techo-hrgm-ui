import { Component, OnInit } from '@angular/core';
import { Training, TrainingsService } from '../trainings.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';

@Component({
  selector: 'app-trainings-page',
  templateUrl: './trainings-page.component.html',
  styleUrls: ['./trainings-page.component.css']
})
export class TrainingsPageComponent implements OnInit {

  trainings$: Observable<Training[]>;

  constructor(
    private trainingsService: TrainingsService,
    private store: Store<AppState>
  ) { 
    this.trainings$ = this.store.select('trainings');
  }

  ngOnInit() {
    this.loadTrainings();
  }

  onCreateTraining(training) {
    this.trainingsService.create(training);
  }

  loadTrainings() {
    this.trainingsService.loadTrainings();
  }

}
