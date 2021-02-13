import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PackageService } from 'src/app/service/package.service';
import { ViewportService } from 'src/app/service/viewport.service';
import { IPage } from 'src/app/type/page.interface';

@Component({
  selector: 'oni-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss']
})
export class PackagePageComponent implements OnInit, IPage {

  packages = this.packageService.packages;
  displayedColumns = [
    'status',
    'packageName',
    'packageUrl',
    'repoName',
  ];
  constructor(
    private readonly titleService: Title,
    public readonly packageService: PackageService,
    public readonly viewPortService: ViewportService,
  ) { }

  title = 'OPEN SOURCE PACKAGES';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
}