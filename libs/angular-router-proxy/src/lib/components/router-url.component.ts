import { Component } from "@angular/core";
import { RouteService } from "../services/route.service";

@Component({
    selector: 'router-url',
    template: `
    <div class="bg-base text-contrast text-xs">
        <div class="max-w-screen-2xl mx-auto p-2">
            <div class="p-2 border rounded">
                <span class="text-accent">URL:</span> /{{routeSvc.url$$.value}}
            </div>
        </div>
    </div>
        `,
})
export class RouterUrlComponent {

    constructor(public routeSvc: RouteService) {}
}