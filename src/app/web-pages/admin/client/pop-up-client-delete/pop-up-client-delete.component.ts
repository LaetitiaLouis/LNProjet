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

  /**
   * Supprime un client via le formulaire
   */
  public onSubmitDelete() {
    this.clientService.deleteClient(this.data.client.id).subscribe(result =>{
      this.es.handleSuccess("Client supprimé");
    },
      _=>this.es.handleError("Une erreur a eu lieu lors de la suppression du client"));
    this.dialogRef.close();
  }

  /**
   * Ferme la popup
   */
  public closePopUp() {
    this.dialogRef.close();
  }
}
