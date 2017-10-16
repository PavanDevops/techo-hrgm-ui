import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubjectPageComponent } from './create-subject-page.component';

describe('CreateSubjectPageComponent', () => {
  let component: CreateSubjectPageComponent;
  let fixture: ComponentFixture<CreateSubjectPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSubjectPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
