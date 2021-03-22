import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  styleUrls: ['./modal-confirmation.component.css']
})
export class ModalConfirmationComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ModalConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    console.log("data ", this.data);
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onOkClick() {
    this.dialogRef.close(true);
  }

}
