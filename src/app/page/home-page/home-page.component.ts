import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { from } from 'rxjs';
import { IPage } from 'src/app/type/page.interface';

@Component({
  selector: 'oni-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, IPage {

  constructor(private readonly titleService: Title) { }
  title = 'ONIVORO.COM';
  title$ = from(this.title.split(''));
  letters = this.title.split('');

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
