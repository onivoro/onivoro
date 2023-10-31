import { AfterViewInit, Component, ComponentRef, OnDestroy, ViewChild } from "@angular/core";
import { RouteService } from "../services/route.service";
import { RouterOutletDirective } from "../directives/router-outlet.directive";
import { Subscription, filter, tap } from "rxjs";

@Component({
    selector: 'router-outlet',
    template: '<ng-template routerOutlet></ng-template>',
})
export class RouterOutletComponent implements AfterViewInit, OnDestroy {
    @ViewChild(RouterOutletDirective, { static: true }) routerOutlet!: RouterOutletDirective;
    componentRef: ComponentRef<any>;
    sub: Subscription | null = null;

    constructor(private routeSvc: RouteService) { }

    ngOnDestroy(): void {
        if (this.sub) {
            this.sub.unsubscribe();
            this.sub = null;
        }
    }

    ngAfterViewInit(): void {
        this.sub = this.routeSvc.component$.pipe(
            filter(_ => !!_),
            tap((component) => this.loadComponent(component))
        )
            .subscribe();
        this.routeSvc.init();
    }

    loadComponent(component: any) {
        const viewContainerRef = this.routerOutlet.viewContainerRef;
        viewContainerRef.clear();

        this.componentRef = viewContainerRef.createComponent(component);
    }
}