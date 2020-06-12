import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../../../service/client.service";
import {ErrorService} from "../../../../service/error.service";

@Component({
  selector: 'app-pop-up-client-delete',
  templateUrl: './pop-up-client-delete.component.html',
  styleUrls: ['./pop-up-client-delete.component.css']
})
export class PopUpClientDeleteComponent implements OnInit {

  constructor(private clientService: ClientService,
              private es: ErrorService,
              public dialogRef: MatDialogRef<PopUpClientDeleteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
  }

  public onSubmitDelete() {
    this.clientService.deleteClient(this.data.client.id).subscribe(this.es.handleSuccess("Client supprimé"), this.es.handleError("Erreur"));
    this.dialogRef.close();
  }

  public closePopUp() {
    this.dialogRef.close();
  }
}
