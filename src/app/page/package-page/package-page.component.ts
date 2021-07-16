import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
// import { PackageService } from 'src/app/service/package.service';
import { Package, PackageService } from '@onivoro/isomorphic-onivoro';
import { map } from 'rxjs/operators';
import { HttpProjectService } from 'src/app/service-http/http-project.service';
import { ViewportService } from 'src/app/service/viewport.service';
import { IPage } from 'src/app/type/page.interface';

@Component({
  selector: 'oni-package-page',
  templateUrl: './package-page.component.html',
  styleUrls: ['./package-page.component.scss']
})
export class PackagePageComponent implements OnInit, IPage {
  token!: string;
  packageService = new PackageService();

  packages$ = this.packageService.getPackages().pipe(
    map(ps => ps.concat([

    ])));

  constructor(
    private readonly titleService: Title,
    public readonly viewPortService: ViewportService,
    private readonly httpProjectService: HttpProjectService
  ) { }

  title = 'OPEN SOURCE PACKAGES';

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

  create(pkg: Package) {
    this.httpProjectService.create(pkg)
  }
}