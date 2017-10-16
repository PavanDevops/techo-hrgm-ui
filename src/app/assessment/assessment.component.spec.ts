import { async, ComponentFixture, TestBed,  } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import {By} from "@angular/platform-browser";

import { AssessmentComponent } from './assessment.component';

describe('AssessmentComponent', () => {
  let component: AssessmentComponent;
  let fixture: ComponentFixture<AssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title `GAP Assessment`', () => {
    let h1El = fixture.debugElement.query(By.css('h1'));

    expect(h1El.nativeElement.textContent).toEqual('GAP Assessment');
  });

  it('should inform the assessee that the assessment has started', () => {
    let startMessageEl = fixture.debugElement.query(By.css('.assessment-startMessage'));

    component.assessee = 'John Smith';
    fixture.detectChanges();
    expect(startMessageEl.nativeElement.textContent).toEqual('Assessment started for John Smith.');
  });

  xit('should inform the assessee how much time they have to complete the assessment', () => {
    let timeMessageEl = fixture.debugElement.query(By.css('.assessment-timerMessage'));

    expect(timeMessageEl.nativeElement.textContent).toEqual('You have 00:45:00 (hh:mm:ss) to complete the assessments');
  });

  describe('getDisplayRemainingTime', () => {

    xit('should return `00:00:00 (hh:mm:ss)` if called with 0', () => {
      expect(component.getDisplayRemainingTime(0)).toEqual('00:00:00 (hh:mm:ss)');
    });

  });


});
