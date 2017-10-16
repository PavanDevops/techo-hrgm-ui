import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import { SubjectsService } from './subjects.service';

describe('SubjectsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
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
        }
      ]
    });
  });

  it('should be created', inject([SubjectsService], (service: SubjectsService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAll', () => {

    it('should retrieve subjects using skills API', inject([
      SubjectsService, MockBackend], 
      fakeAsync((subjectsService, mockBackend) => {
        var res;

        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://uat-hire.techolution.com:8086/json/trainings/subjects');
          let response  = new ResponseOptions({ body: [{ id: 1, name: 'Java' }]});
          c.mockRespond(new Response(response));
        });

        subjectsService.getAll().subscribe((_res) => {
          res = _res;
        });

        tick();

        expect(res).toEqual([{ id: 1, name: 'Java' }]);
      }))
    );

  });

  describe('create', () => {

    it('should create a new subject', inject([
      SubjectsService, MockBackend], 
      fakeAsync((subjectsService, mockBackend) => {
        let res;
        let newSubject = {
          id: null,
          name: 'Java',
          skillId: '123456',
          skillName: 'Java'
        };
        let createdSubject = {};

        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://uat-hire.techolution.com:8086/json/trainings/subject');
          Object.assign(createdSubject, newSubject, { id: 1 });
          let response  = new ResponseOptions({ body: [createdSubject] });
          c.mockRespond(new Response(response));
        });

        subjectsService.create(newSubject).subscribe((_res) => {
          res = _res;
        });

        tick();

        expect(res).toEqual([createdSubject]);

      }))
    );

  });

});
