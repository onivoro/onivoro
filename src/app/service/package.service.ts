import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Package } from '../model/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  packages: Package[] = [
    new Package('angular-diagrams', 'prerelease'),
    new Package('angular-serializable-forms'),
    new Package('server-disk'),
    new Package('server-parameterization'),
    new Package('server-process'),
    new Package('server-git', 'prerelease'),
    new Package('server-vscode', 'prerelease'),
    new Package('server-build', 'prerelease'),
    new Package('server-event-sourcing'),
    new Package('server-app-vscx', 'prerelease'),
    new Package('server-elastic-search', 'prerelease'),
    new Package('nodejs-cli-sdk', 'deprecated'),
  ];
  getPackages = () => of(this.packages);
}
