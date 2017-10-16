import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { 
  RouterLinkActiveStubDirective, 
  RouterLinkStubDirective, 
  RouterLinkActiveOptionsStubDirective, 
  RouterOutletStubComponent 
} from './testing-helpers/router-stubs';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let linkDirectives: RouterLinkStubDirective[];
  let linkDebugElements: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterLinkStubDirective,
        RouterLinkActiveStubDirective,
        RouterLinkActiveOptionsStubDirective,
        RouterOutletStubComponent
      ],
      imports: [ ]
    }).compileComponents();
  }));

  beforeEach(() => {
    let linksDirectives;

    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    linkDebugElements = fixture.debugElement.queryAll(By.directive(RouterLinkStubDirective));
    linkDirectives = linkDebugElements.map(d => d.injector.get(RouterLinkStubDirective) as RouterLinkStubDirective);
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Techocamp'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Techocamp');
  }));

  it('should have 2 RouterLinks', () => {
    expect(linkDirectives.length).toBe(2);
  });

  it('should have a default route that is empty', () => {
    expect(linkDirectives[0].linkParams).toEqual(['']);
  });

  it('should have a /subjects RouterLink for second link', () => {
    expect(linkDirectives[1].linkParams).toEqual(['/subjects']);
  });

  it('allows user to click subject link', () => {
    let subjectsDe = linkDebugElements[1];
    let subjectsLink = linkDirectives[1];

    expect(subjectsLink.navigatedTo).toBeNull();

    subjectsDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(subjectsLink.navigatedTo).toEqual(['/subjects']);
  });

  it('allows user to click the default link', () => {
    let subjectsDe = linkDebugElements[0];
    let subjectsLink = linkDirectives[0];

    expect(subjectsLink.navigatedTo).toBeNull();

    subjectsDe.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(subjectsLink.navigatedTo).toEqual(['']);
  });
  
});
