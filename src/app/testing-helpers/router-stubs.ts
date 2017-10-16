import { Component, Directive, Input } from '@angular/core';

@Directive({
    selector: '[routerLink]',
    host: {
      '(click)': 'onClick()'
    }
  })
export class RouterLinkStubDirective {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  onClick() {
      this.navigatedTo = this.linkParams;
  }
}

@Directive({
  selector: '[routerLinkActive]'
})
export class RouterLinkActiveStubDirective {
  @Input('routerLinkActive') linkParams: any;
}

@Directive({
  selector: '[routerLinkActiveOptions]'
})
export class RouterLinkActiveOptionsStubDirective {
  @Input('routerLinkActiveOptions') linkParams: any;
}

@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }
