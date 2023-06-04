import { Component, Input } from "@angular/core";

@Component({
    selector: 'onivoro-drop-down',
    templateUrl: './drop-down.component.html',
    styleUrls: ['./drop-down.component.scss'],
})
export class DropDownComponent {
    open = false;
    @Input() left: string;
    @Input() right: string;
}