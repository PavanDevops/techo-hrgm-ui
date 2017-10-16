import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill, SkillsService } from '../skills.service';
import { Subject, SubjectsService } from '../subjects.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'create-subject-page',
  templateUrl: './create-subject-page.component.html',
  styleUrls: ['./create-subject-page.component.css']
})
export class CreateSubjectPageComponent implements OnInit {

  skills$: Observable<Skill[]>;

  constructor(
    private skillsService: SkillsService,
    private subjectsService: SubjectsService,
    private store: Store<AppState>,
    private router: Router
  ) { 
    this.skills$ = this.store.select('skills');
  }

  ngOnInit() {
    this.loadSkills();
  }

  loadSkills() {
    this.skillsService.loadSkills();
  }

  onCancel() {
    this.router.navigate(['/subjects']);
  }

  onCreateSubject(subject: Subject) {
    this.subjectsService.create(subject);
  }

}
