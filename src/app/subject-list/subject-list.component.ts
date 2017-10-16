import { 
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output 
} 
from '@angular/core';
import { Subject } from '../subjects.service';

@Component({
  selector: 'subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubjectListComponent implements OnInit {

  @Input() subjects: Subject[] = [];
  @Output() delete = new EventEmitter<Subject>();
  @Output() select = new EventEmitter<Subject>();

  selected: Subject;

  constructor() { }

  ngOnInit() {

  }

}
