import { Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
    selector: 'onivoro-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DropDownComponent {
    open = false;
    @Input() left: string;
    @Input() right: string;
}