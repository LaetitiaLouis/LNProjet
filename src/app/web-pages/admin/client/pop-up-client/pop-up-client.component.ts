import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../../../service/client.service";
import {ErrorService} from "../../../../service/error.service";

@Component({
  selector: 'app-pop-up-client',
  templateUrl: './pop-up-client.component.html',
  styleUrls: ['./pop-up-client.component.css']
})
export class PopUpClientComponent implements OnInit {
  public formBody: FormGroup;


  constructor(private fb: FormBuilder,
              private clientService: ClientService,
              private route: ActivatedRoute,
              public error: ErrorService,
              public dialogRef: MatDialogRef<PopUpClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.formClient();
  }

  /**
   * Crée un formulaire client
   */
  public formClient(): void {
    this.formBody = this.fb.group({
      nom: [this.data.update ? this.data.client.nom : ''],
      prenom: [this.data.update ? this.data.client.prenom : ''],
      adresse: [this.data.update ? this.data.client.adresse : ''],
      codePostal: [this.data.update ? this.data.client.codePostal : ''],
      ville: [this.data.update ? this.data.client.ville : ''],
      telephone: [this.data.update ? this.data.client.telephone : ''],
      email: [this.data.update ? this.data.client.email : ''],
      refDevis: [this.data.update ? this.data.client.refDevis : ''],
      refFacture: [this.data.update ? this.data.client.refFacture : ''],
    })
  }

  /**
   * Crée un nouveau client via le formulaire
   */
  public onSubmitCreate(): void {
    this.clientService.saveNewClient(this.formBody.value).subscribe();
    this.dialogRef.close();
  }

  /**
   * Réactive le champ du formulaire
   */
  public enable(champ: string) {
    if (this.data.update) {
      this.formBody.get(champ).enable();
      this.formBody.get(champ).setValue("");
    }
  }

  /**
   * Récupère  et modifie un client via le formulaire
   */
  public onSubmitUpdate() {
    const client = {id: this.data.client.id, ...this.formBody.value}
    this.clientService.updateClient(client).subscribe(client => {
      this.error.handleSuccess("Client modifié");
      this.dialogRef.close();
    });
    _ => this.error.handleError("Votre client n'a pas été modifié");
  }

  // /**
  //  * Supprime un client
  //  */
  // public onSubmitDelete() {
  //   this.clientService.deleteClient(this.formBody.value).subscribe();
  //   this.dialogRef.close();
  // }

  /**
   * Ferme la popup
   */
  public closePopUp() {
    this.dialogRef.close();
  }
}
