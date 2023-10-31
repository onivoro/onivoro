import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[routerOutlet]',
})
export class RouterOutletDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}