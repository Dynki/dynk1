import { Observable } from 'rxjs/Rx';
import { ConfirmationComponent } from './dyn-confirm.component';
import { MdDialogRef, MdDialog, MdDialogConfig } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class DynDialogService {

    constructor(private dialog: MdDialog) { }

    public confirm(title: string, message: string): Observable<boolean> {

        let dialogRef: MdDialogRef<ConfirmationComponent>;

        dialogRef = this.dialog.open(ConfirmationComponent);

        dialogRef.componentInstance.title = title;
        dialogRef.componentInstance.message = message;

        return dialogRef.afterClosed();
    }
}
