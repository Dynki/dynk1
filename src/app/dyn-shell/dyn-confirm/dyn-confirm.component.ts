import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
  selector: 'dyn-confirm',
  templateUrl: './dyn-confirm.component.html',
})
export class ConfirmationComponent {

    public title: string;
    public message: string;

    constructor(
        public dialogRef: MdDialogRef<ConfirmationComponent>
    ) {}
}