import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ViewportService } from '../../service/viewport.service';
import { links } from '../../constant/links';
import { trackByFunctions } from '../../constant/track-by-functions';

@Component({
  selector: 'oni-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  readonly byIndex = trackByFunctions.byIndex;
  readonly isHandset$: Observable<boolean> = this.viewportService.isHandset$;
  readonly links$ = of(links)

  constructor(private readonly viewportService: ViewportService, ) { }
}
