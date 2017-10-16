import { Subject } from '../subjects.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';



@Component({
  selector: 'subject-detail',
  templateUrl: './subject-detail.component.html',
  styleUrls: ['./subject-detail.component.css']
})
export class SubjectDetailComponent implements OnInit {

  @Input() subject;
  @Output() updateSubject = new EventEmitter<Subject>();

  editable: boolean = false;

  form: FormGroup;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      'name': [undefined, Validators.required],
      'trainings': [[], Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.form.reset({
      name: this.subject ? this.subject.name : '',
      trainings: []
    });
  }

  onSubmit() {
    let updatedSubject = Object.assign({}, this.subject);

    updatedSubject.name = this.form.controls.name.value;
  
    this.updateSubject.emit(updatedSubject);
  }

  revert() {
    this.ngOnChanges();
  }

}
