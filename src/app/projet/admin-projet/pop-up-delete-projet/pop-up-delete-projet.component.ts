import {Component, Inject, OnInit} from '@angular/core';
import {ClientService} from "../../../service/client.service";
import {ErrorService} from "../../../service/error.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjetService} from "../../../service/projet.service";

@Component({
  selector: 'app-pop-up-delete-projet',
  templateUrl: './pop-up-delete-projet.component.html',
  styleUrls: ['./pop-up-delete-projet.component.css']
})
export class PopUpDeleteProjetComponent implements OnInit {

  constructor(private projetService: ProjetService,
              private es: ErrorService,
              public dialogRef: MatDialogRef<PopUpDeleteProjetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }
  onSubmitDelete() {
    this.projetService.deleteProjet(this.data.projet.id).subscribe(this.es.handleSuccess("Projet supprimé"), this.es.handleError("Erreur"));
    this.dialogRef.close();
  }

  closePopUp() {
    this.dialogRef.close();
  }
}
