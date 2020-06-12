import {Component, Inject, OnInit} from '@angular/core';
import {MessageService} from "../../../../../service/message.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorService} from "../../../../../service/error.service";

@Component({
  selector: 'app-pop-up-delete-message',
  templateUrl: './pop-up-delete-message.component.html',
  styleUrls: ['./pop-up-delete-message.component.css']
})
export class PopUpDeleteMessageComponent implements OnInit {

  constructor(private messageService: MessageService,
              private es: ErrorService,
              public dialogRef: MatDialogRef<PopUpDeleteMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
  }

  onSubmitDelete() {
    this.messageService.deleteMessage(this.data.message.id).subscribe(this.es.handleSuccess("Message supprimé"), this.es.handleError("Erreur"));
    this.dialogRef.close();
  }

  closePopUp() {
    this.dialogRef.close();
  }
}
