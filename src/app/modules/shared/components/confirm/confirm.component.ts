import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm',
  standalone: false,
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent {
  public dialogRef = inject(MatDialogRef<ConfirmComponent>)
  public message = inject<string>(MAT_DIALOG_DATA);

  onNoClick(){
    this.dialogRef.close('N');
  }

  onYesClick(){
    this.dialogRef.close('S');
  }
}
