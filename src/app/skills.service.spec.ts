import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, ConnectionBackend, BaseRequestOptions, Response, ResponseOptions} from '@angular/http';
import { SkillsService } from './skills.service';

describe('SkillsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        SkillsService,
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

  it('should be created', inject([SkillsService], (service: SkillsService) => {
    expect(service).toBeTruthy();
  }));

  describe('getAll', () => {

    it('should retrieve skills using skills API', inject([
      SkillsService, MockBackend], 
      fakeAsync((skillsService, mockBackend) => {
        var res;

        mockBackend.connections.subscribe(c => {
          expect(c.request.url).toBe('http://hire.techolution.com:8082/json/skills');
          let response  = new ResponseOptions({ body: [{ id: 1, name: 'Java' }]});
          c.mockRespond(new Response(response));
        });

        skillsService.getAll().subscribe((_res) => {
          res = _res;
        });

        tick();

        expect(res).toEqual([{ id: 1, name: 'Java' }]);
      }))
    );

  });

});
