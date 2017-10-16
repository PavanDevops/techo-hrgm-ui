import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Subject } from '../subjects.service';
import { CreateSubjectComponent } from './create-subject.component';



describe('CreateSubjectComponent', () => {
  let component: CreateSubjectComponent;
  let fixture: ComponentFixture<CreateSubjectComponent>;
  const MOCK_SKILLS = [
    {
      id: '1',
      name: 'Java'
    },
    {
      id: '2',
      name: 'Javascript'
    },
    {
      id: '3',
      name: 'Redux'
    }
  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ CreateSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title `Create Subject`', () => {
    let titleEl = fixture.debugElement.query(By.css('h3'));
    expect(titleEl.nativeElement.textContent).toEqual('Create Subject');
  });

  it('should display an input field for the name of the subject with a label', () => {
    let nameInputEl = fixture.debugElement.query(By.css('.create-subject-name-field'));
    let nameLabelEl = fixture.debugElement.query(By.css('.create-subject-name-label'));
    expect(nameInputEl.nativeElement).toBeDefined();
    expect(nameLabelEl.nativeElement).toBeDefined();
    expect(nameLabelEl.nativeElement.textContent).toEqual('Name');
  });

  it('should require the name field', () => {
    let name = component.form.controls['name'];
    let errors = name.errors || {};
    expect(name.valid).toBeFalsy();
    expect(errors['required']).toBeTruthy();
    name.setValue('Test Subject');
    errors = name.errors || {};
    expect(name.valid).toBeTruthy();
    expect(errors['required']).toBeFalsy();
  });

  it('should set form to invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('should set form to valid only when name and skill are provided', () => {
    let name = component.form.controls.name;
    let skill = component.form.controls.skill;
    expect(component.form.valid).toBeFalsy();
    name.setValue('Test Subject');
    expect(component.form.valid).toBeFalsy();
    skill.setValue(1);
    expect(component.form.valid).toBeTruthy();
  });

  describe('onSubmit', () => {

    it('should raise a createSubject event when the form is submitted', () => {
      let newSubject: Subject;
  
      expect(component.form.valid).toBeFalsy();
      component.form.controls['name'].setValue('Java');
      component.form.controls['skill'].setValue(MOCK_SKILLS[0]);
      expect(component.form.valid).toBeTruthy();
      fixture.detectChanges();
  
      component.createSubject.subscribe((subject: Subject) => newSubject = subject );
      fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
      expect(newSubject).toBeDefined();
    });

    it('should pass new subject with name, skillId, and skillName to createSubject', () => {
      let newSubject: Subject;
      let expectedSubject: Subject;

      expectedSubject = {
        id: null,
        name: 'Java',
        skillId: '1',
        skillName: 'Java'
      }

      component.form.controls['name'].setValue('Java');
      component.form.controls['skill'].setValue(MOCK_SKILLS[0]);

      component.createSubject.subscribe((subject: Subject) => newSubject = subject );
      fixture.debugElement.query(By.css('form')).triggerEventHandler('submit', null);
      
      expect(newSubject).toEqual(expectedSubject);
    });

  });

  describe('skills dropdown', () => {

    let skillsSelectEl: DebugElement;
    let skillsLabelEl: DebugElement;

    beforeEach(() => {
      skillsSelectEl = fixture.debugElement.query(By.css('.create-subject-skills-field'));
      skillsLabelEl = fixture.debugElement.query(By.css('.create-subject-skills-label'));
    });

    it('should display a dropdown for skills with a label that says `Skill`', () => {
      expect(skillsSelectEl.nativeElement).toBeDefined();
      expect(skillsLabelEl.nativeElement).toBeDefined();
      expect(skillsLabelEl.nativeElement.textContent).toEqual('Skill');
    });

    it('should require the skill field', () => {
      let skill = component.form.controls['skill'];
      let errors = skill.errors || {};
      expect(skill.valid).toBeFalsy();
      expect(errors['required']).toBeTruthy();
      skill.setValue(1);
      errors = skill.errors || {};
      expect(skill.valid).toBeTruthy();
    });

    it('should display default message `Please choose a skill to map to this subject` using a dummy option if no option is selected', () => {
      expect(skillsSelectEl.nativeElement.selectedOptions[0].text).toEqual('Please choose a skill to map to this subject');
    });

    it('should display an option for each skill bound to the skills input', () => {
      expect(skillsSelectEl.nativeElement.options.length).toBe(1);
      component.skills = MOCK_SKILLS;
      fixture.detectChanges();
      expect(skillsSelectEl.nativeElement.options.length).toBe(4);
    });

    it('should have dummy option for skill disabled to prevent reselection', () => {
      let dummySkillOptionEl = skillsSelectEl.nativeElement.options[0];
      expect(dummySkillOptionEl.disabled).toEqual(true);
    });

  });

  describe('submit button', () => {

    let submitBtnEl: DebugElement;

    beforeEach(() => {
      submitBtnEl = fixture.debugElement.query(By.css('button[type=submit]'));
    });

    it('should be defined', () => {
      expect(submitBtnEl.nativeElement).toBeDefined();
    });
  
    it('should show the text `Create Subject`', () => {
      expect(submitBtnEl.nativeElement.textContent).toEqual('Create Subject');
    });

    it('should be disabled if the form is not valid', () => {
      expect(submitBtnEl.nativeElement.disabled).toEqual(true);
    });

    it('should NOT be disabled if the form is valid', () => {
      component.form.controls['name'].setValue('Java');
      component.form.controls['skill'].setValue(1);
      fixture.detectChanges();
      expect(submitBtnEl.nativeElement.disabled).toEqual(false);
    });

  });

  describe('reset', () => {

    let name;
    let skill;

    beforeEach(() => {
      component.skills = MOCK_SKILLS;
      name = component.form.controls['name'];
      name.setValue('Java');
      skill = component.form.controls['skill'];
      skill.setValue(1);
      fixture.detectChanges();
    });

    it('should be defined', () => {
      expect(component.reset).toBeDefined();
    });

    it('should clear each field in the form', () => {
      expect(name.value).toEqual('Java');
      expect(skill.value).toEqual(1);
      component.reset();
      expect(name.value).toEqual('');
      expect(skill.value).toEqual('');
    });

    it('should reset the valid state of the form', () => {
      expect(component.form.valid).toEqual(true);
      component.reset();
      expect(component.form.valid).toEqual(false);
    });

    it('should cause the submit button to be disabled', () => {
      let submitBtnEl = fixture.debugElement.query(By.css('button[type=submit]'));
      expect(submitBtnEl.nativeElement.disabled).toBeFalsy();
      component.reset();
      fixture.detectChanges();
      expect(submitBtnEl.nativeElement.disabled).toBeTruthy();
    });

  });

});
