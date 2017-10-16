import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})
export class AssessmentComponent implements OnInit {

  @Input() allottedMinutes: number = 60;
  @Input() assessee: string;

  remainingTimeDisplay: string;
  remainingSeconds: number;

  constructor() { }

  ngOnInit() {
    this.remainingSeconds = this.allottedMinutes * 60;
    this.remainingTimeDisplay = this.getDisplayRemainingTime(this.remainingSeconds);
  }

  getDisplayRemainingTime(remainingSeconds:number) : string {
    let hours = remainingSeconds / (60 * 60);
    let minutes = 0;
    let seconds = 0;

    return `${hours}:${minutes}:${seconds} (hh:mm:ss)`;
  }

}
