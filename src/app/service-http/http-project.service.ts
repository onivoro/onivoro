import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpBaseService } from './http-base.service';
import { Package, ProjectType } from '@onivoro/isomorphic-onivoro';

@Injectable({
  providedIn: 'root'
})
export class HttpProjectService extends HttpBaseService {
  getResourceType(): string {
    return 'project';
  }

  constructor(private readonly http: HttpClient) {
    super();
  }

  create(pkg: Package) {
    const {packageName, type} = pkg;
    return this.http.post(this.getUrl(), { packageName, type });
  }
}
