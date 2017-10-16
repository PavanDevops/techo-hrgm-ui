import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Training } from '../trainings.service';

export const TRAINING_TYPES: Array<string> = ['theory', 'video', 'lab'];

@Component({
  selector: 'create-training',
  templateUrl: './create-training.component.html',
  styleUrls: ['./create-training.component.css']
})
export class CreateTrainingComponent implements OnInit {

  @Output() createTraining = new EventEmitter<Training>();

  form: FormGroup;

  types: Array<string>;

  constructor(private fb: FormBuilder) { 
    this.createForm();
  }

  createForm() {
    this.types = TRAINING_TYPES;
    this.form = this.fb.group({
      'name': [undefined, Validators.required],
      'type': ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(training: Training) {

    let name = this.form.controls.name.value;
    let type = this.form.controls.type.value;

    this.reset();

    this.createTraining.emit({
      "id": null,
      "category": type,
      "name": name,
      "type": type
    });
  }

  reset() {
    this.form.reset();
    this.form.controls.name.setValue('');
    this.form.controls.type.setValue('');
  }

}
