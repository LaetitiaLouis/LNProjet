import {Component, Inject, OnInit} from '@angular/core';
import {ErrorService} from "../../../../service/error.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjetService} from "../../../../service/projet.service";

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

  public ngOnInit(): void {
  }

  public onSubmitDelete() {
    this.projetService.deleteProjet(this.data.projet.id).subscribe( result => {
      this.es.handleSuccess("Projet supprimé");
    },
      _=>this.es.handleError("Erreur : votre projet n'a pas été supprimé"));
    this.dialogRef.close();
  }

  public closePopUp() {
    this.dialogRef.close();
  }
}
