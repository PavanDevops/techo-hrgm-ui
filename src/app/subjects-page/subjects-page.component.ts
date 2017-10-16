import { Component, OnInit } from '@angular/core';
import { Skill, SkillsService } from '../skills.service';
import { Subject, SubjectsService } from '../subjects.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { Router } from '@angular/router';


@Component({
  selector: 'subjects-page',
  templateUrl: './subjects-page.component.html',
  styleUrls: ['./subjects-page.component.css']
})
export class SubjectsPageComponent implements OnInit {

  creatingNew: boolean = false;
  selectedSubject: Subject;
  skills$: Observable<Skill[]>;
  subjects$: Observable<Subject[]>;

  constructor(
    private router: Router,
    private skillsService: SkillsService,
    private store: Store<AppState>,
    private subjectsService: SubjectsService
  ) { 
    this.subjects$ = this.store.select('subjects');
    this.skills$ = this.store.select('skills');
  }

  ngOnInit() {
    this.loadSkills();
    this.loadSubjects();
  }

  loadSkills() {
    this.skillsService.loadSkills();
  }

  loadSubjects() {
    this.subjectsService.loadSubjects();

  }

  onAddClick() {
    this.creatingNew = true;
  }

  onCancel() {
    this.creatingNew = false;
  }

  onCreateSubject(subject) {
    this.subjectsService.create(subject);
  }

  onDeleteSubject(subject) {
    this.subjectsService.remove(subject);
  }

  onUpdateSubject(subject) {
    this.subjectsService.update(subject);
  }

}
