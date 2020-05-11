import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProjetService} from "../../../service/projet.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'app-pop-up-projet',
  templateUrl: './pop-up-projet.component.html',
  styleUrls: ['./pop-up-projet.component.css']
})
export class PopUpProjetComponent implements OnInit {
  public formBody: FormGroup;


  constructor(private fb: FormBuilder,
              private projetService: ProjetService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<PopUpProjetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private es: ErrorService) {
  }

  ngOnInit(): void {
    this.formProjet();
  }

  formProjet(): void {
    const adminLogin = this.route.paramMap.subscribe(params => ('login'));
    this.formBody = this.fb.group({
      intitule: [this.data.update ? this.data.projet.intitule : ''],
      description: [this.data.update ? this.data.projet.description : ''],
      photos: [this.data.update ? this.data.projet.photos : ''],
      admin: [{value: "adminLogin", disabled: !this.data.update}]
    })
  }

  onSubmitCreate(): void {
    this.projetService.saveProjetInfos(this.formBody.value)
      .subscribe(this.es.handleSuccess("Projet créé"), this.es.handleError("Erreur")
    );
    this.dialogRef.close();
  }

  enable(champ: string) {
    if (this.data.update) {
      this.formBody.get(champ).enable();
      this.formBody.get(champ).setValue("");
    }
  }

  onSubmitUpdate() {
    const projet = {id: this.data.projet.id, ...this.formBody.value}
    this.projetService.updateProjet(projet)
      .subscribe(this.es.handleSuccess("Projet modifié"), this.es.handleError("Erreur")
      );
    this.dialogRef.close();
  }

  closePopUp() {
    this.dialogRef.close();
  }
}


