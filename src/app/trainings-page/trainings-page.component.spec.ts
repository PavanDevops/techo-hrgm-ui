import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingsPageComponent } from './trainings-page.component';

describe('TrainingsPageComponent', () => {
  let component: TrainingsPageComponent;
  let fixture: ComponentFixture<TrainingsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
