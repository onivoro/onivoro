import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { Observable } from 'rxjs';
import { INavigable } from 'src/app/type/navigable.interface';
import { links } from '../constant/links';
import { ViewportService } from '../service/viewport.service';
@Component({
  selector: 'oni-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly isHandset$: Observable<boolean> = this.viewportService.isHandset$;
  links = links
  route: any;

  constructor(
    private readonly router: Router,
    private readonly viewportService: ViewportService
  ) { }

  navigate(link: INavigable) {
    this.router.navigate([link?.slug || '']);
  }
}
