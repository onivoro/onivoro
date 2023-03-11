import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'onivoro-upload',
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  uploadData: any;
  attachData: any;

  constructor(private http: HttpClient){}

  async upload($event: any) {
    this.uploadData = $event;
    console.warn('this.uploadData', this.uploadData);
  }
  async attach($event: any) {
    this.attachData = $event;
    console.warn('this.attachData', this.attachData);
  }

  async post () {
    this.http.post(`http://localhost:3333/api/file/${Date.now()}`, this.uploadData).subscribe();
  }
}
