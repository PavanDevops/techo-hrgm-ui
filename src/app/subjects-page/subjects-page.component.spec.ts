import { async, ComponentFixture, TestBed  } from '@angular/core/testing';
import { Http, ConnectionBackend, BaseRequestOptions} from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { SubjectsPageComponent } from './subjects-page.component';
import { CreateSubjectComponent } from '../create-subject/create-subject.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillsService } from '../skills.service';
import { Subject, SubjectsService } from '../subjects.service';
import { SubjectListComponent } from '../subject-list/subject-list.component';

const skillsObservable = Observable.of([{ id: '1', name: 'Java' }]);
const subjectsObservable = Observable.of([{ id: '1', name: 'Java', skillId: '1234abc', skillName: 'Java'}]);

const skillsServiceStub = {
  getAll: () => skillsObservable
};

const subjectsServiceStub = {
  create: () => {},
  getAll: () => subjectsObservable
};

describe('SubjectsPageComponent', () => {

  describe('unit tests', () => {
    
      let subjectsPageComponent: SubjectsPageComponent;
      let fakeHttp = {};
      let skillsService: SkillsService;
      let subjectsService: SubjectsService;
    
      beforeEach(() => {
        skillsService = new SkillsService(fakeHttp as Http);
        subjectsService = new SubjectsService(fakeHttp as Http);
    
        spyOn(skillsService, 'getAll').and.returnValue(skillsObservable);
        spyOn(subjectsService, 'getAll').and.returnValue(subjectsObservable);
    
        subjectsPageComponent = new SubjectsPageComponent(
          skillsService, 
          subjectsService
        );
    
      }); 
    
      describe('loadSubjects', () => {
    
        it('should call getAll on subjectsService', () => {
          expect(subjectsService.getAll).not.toHaveBeenCalled();
          subjectsPageComponent.loadSubjects();
          expect(subjectsService.getAll).toHaveBeenCalled();
        });
    
        it('should cause subjects to be set', () => {
          subjectsPageComponent.subjects = [];
          subjectsPageComponent.loadSubjects();
          expect(subjectsPageComponent.subjects).toEqual([{ id: '1', name: 'Java', skillId: '1234abc', skillName: 'Java'}]);
        });
        
      });
    
  });

  describe('component tests', () => {
    let component: SubjectsPageComponent;
    let fixture: ComponentFixture<SubjectsPageComponent>;
    let subjectsService: SubjectsService;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [ ReactiveFormsModule ],
        declarations: [ 
          CreateSubjectComponent,
          SubjectListComponent,
          SubjectsPageComponent
        ],
        providers: [
          BaseRequestOptions,
          MockBackend,
          SubjectsService,
          { 
            provide: Http,
            useFactory: (backend: ConnectionBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [ MockBackend, BaseRequestOptions ]
          },
          { provide: SkillsService, useValue: skillsServiceStub },
          { provide: SubjectsService, useValue: subjectsServiceStub }
        ],
      })
      .compileComponents();
  
    }));
  
    beforeEach(() => {
      fixture = TestBed.createComponent(SubjectsPageComponent);
      component = fixture.componentInstance;
      subjectsService = fixture.debugElement.injector.get(SubjectsService);
      fixture.detectChanges();
    });
  
    it('should be created', () => {
      expect(component).toBeTruthy();
    });
  
    it('should have a create-subject component', () => {
      let createSubjectComponent = fixture.debugElement.query(By.css('create-subject'));
  
      expect(createSubjectComponent.nativeElement).toBeDefined();
    });
  
    it('should define Array<Skill>', () => {
      expect(component.skills).toBeDefined();
    });
  
    it('should retrieve skills and assign them to the skills array', () => {
      expect(component.skills.length).toBe(1);
      expect(component.skills[0]).toEqual({ id: '1', name: 'Java' });
    });
  
    describe('onCreateSubject', () => {
  
      it('should delegate subject creation to subjectsSerivce by calling subjectsService.create with subject payload', () => {
        let payload = { id: null, name: 'Java', skillId: '12345', skillName: 'Java' };
        let newSubject = Object.assign({}, payload, { id: 1 });
        let spy = spyOn(subjectsService, 'create').and.returnValue(Observable.of([ newSubject ]));
  
        component.onCreateSubject(payload);
        expect(spy).toHaveBeenCalledWith(payload);
      });
  
    });

    describe('parent/child component integration tests', () => {
      
      it('should cause subjects-list component to list 2 subjects if subjects.length === 2', () => {
        let displayedSubjectsDe;

        fixture.detectChanges();
        displayedSubjectsDe = fixture.debugElement.queryAll(By.css('.subject-list-item'));
        expect(displayedSubjectsDe.length).toBe(1);
        component.subjects = [
          { id: '1', name: 'Java', skillId: '1234abc', skillName: 'Java'},
          { id: '2', name: 'Javascript', skillId: '1234abcd', skillName: 'Javascript'}
        ];
        fixture.detectChanges();
        displayedSubjectsDe = fixture.debugElement.queryAll(By.css('.subject-list-item'));
        expect(displayedSubjectsDe.length).toBe(2);

      });
  
    });

  });

});
