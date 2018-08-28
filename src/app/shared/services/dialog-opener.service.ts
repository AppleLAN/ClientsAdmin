import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable()
export class DialogOpener {

  constructor(private dialog: MatDialog) {}

  openDialog(component, data) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = data;

    this.dialog.open(component, dialogConfig);
  }
}
