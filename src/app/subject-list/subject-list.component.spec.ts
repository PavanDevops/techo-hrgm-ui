import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SubjectListComponent } from './subject-list.component';

describe('SubjectListComponent', () => {
  let component: SubjectListComponent;
  let fixture: ComponentFixture<SubjectListComponent>;

  const MOCK_SUBJECTS = [
    {
      id: '1abc2',
      name: 'Java',
      skillId: '12345abc',
      skillName: 'Java'
    },
    {
      id: '23bc2',
      name: 'Javascript',
      skillId: 'abc456',
      skillName: 'Javascript'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should dipslay the title `Subjects` in an h3 tag', () => {
    let titleDe: DebugElement = fixture.debugElement.query(By.css('h3'));
    expect(titleDe.nativeElement.textContent).toEqual('Subjects');
  });

  it('should display the messasge `No Subjects` if `components.subjects.length` = 0', () => {
    let messageDe: DebugElement = fixture.debugElement.query(By.css('.subject-list-message'));
    expect(messageDe.nativeElement.textContent).toEqual('No Subjects');

  });

  it('should display 1 subject if `component.subjects.length` == 1', () => {
    let subjectsDeList: DebugElement[];
    component.subjects = MOCK_SUBJECTS.slice(0, 1);
    fixture.detectChanges();
    subjectsDeList = fixture.debugElement.queryAll(By.css('.subject-list-item'));
    expect(subjectsDeList.length).toBe(1);
  });

  it('should display 2 subjects if `component.subjects.length` == 2', () => {
    let subjectsDeList: DebugElement[];
    component.subjects = MOCK_SUBJECTS.slice(0, 2);
    fixture.detectChanges();
    subjectsDeList = fixture.debugElement.queryAll(By.css('.subject-list-item'));
    expect(subjectsDeList.length).toBe(2);
  });

  it('should toggle bettwen showing 1 subject and 2 subjects of `component.subjects.length` also toggles between 1 and 2', () => {
    let subjectsDeList: DebugElement[];
    component.subjects = MOCK_SUBJECTS.slice(0, 1);
    fixture.detectChanges();
    subjectsDeList = fixture.debugElement.queryAll(By.css('.subject-list-item'));
    expect(subjectsDeList.length).toBe(1);

    component.subjects = MOCK_SUBJECTS.slice(0, 2);
    fixture.detectChanges();
    subjectsDeList = fixture.debugElement.queryAll(By.css('.subject-list-item'));
    expect(subjectsDeList.length).toBe(2);

    component.subjects = MOCK_SUBJECTS.slice(0, 1);
    fixture.detectChanges();
    subjectsDeList = fixture.debugElement.queryAll(By.css('.subject-list-item'));
    expect(subjectsDeList.length).toBe(1);
  });

});
