import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from '../skills.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from '../subjects.service';

@Component({
  selector: 'create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.css']
})
export class CreateSubjectComponent implements OnInit {

  @Input() skills: Skill[];
  
  @Output() createSubject = new EventEmitter<Subject>();

  @Output() cancel = new EventEmitter<void>();

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { 
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      'name': [undefined, Validators.required],
      'skill': ['', Validators.required]
    });
  }

  ngOnInit() {}

  onCancel() {
    this.reset();
    this.cancel.emit();
  }

  onSubmit() {
    let name = this.form.controls.name.value;
    let skill = this.form.controls.skill.value;

    this.reset();

    this.createSubject.emit({
      "id": null,
      "name": name,
      "skillId": skill.id,
      "skillName": skill.name
    });

  }

  reset() {
    this.form.reset();
    this.form.controls.name.setValue('');
    this.form.controls.skill.setValue('');
  }

}
