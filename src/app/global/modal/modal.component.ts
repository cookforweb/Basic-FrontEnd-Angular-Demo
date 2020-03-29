import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {logging} from 'selenium-webdriver';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @Input() size;
    @Input() title;
    @Input() isActive;
    @Input() loading = false;
    @Output() doInactive = new EventEmitter<object>();

    constructor() {
    }

    ngOnInit() {
    }

    doCloseModal(hard = false) {
        this.doInactive.emit({
            value: false,
            hard: hard,
        });
    }
}
