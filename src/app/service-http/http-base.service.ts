import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class HttpBaseService {
  hostPath = `http://localhost:3111/`;
  getUrl = (path?: string) => `${this.hostPath}${path || ''}`;

  abstract getResourceType(): string;
}
