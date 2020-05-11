import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ClientService} from "../../service/client.service";

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
              public dialogRef: MatDialogRef<PopUpClientComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.formClient();
  }

  formClient(): void {
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
      // admin: [{value: "adminLogin", disabled: !this.data.update}]
    })
  }

  onSubmitCreate(): void {
    this.clientService.saveNewClient(this.formBody.value).subscribe();
    this.dialogRef.close();
  }

  enable(champ: string) {
    if (this.data.update) {
      this.formBody.get(champ).enable();
      this.formBody.get(champ).setValue("");
    }
  }

  onSubmitUpdate() {
    const client = {id: this.data.client.id, ...this.formBody.value}
    this.clientService.updateClient(client).subscribe();
    this.dialogRef.close();
  }

  onSubmitDelete() {
    this.clientService.deleteClient(this.formBody.value).subscribe();
    this.dialogRef.close();
  }

  closePopUp() {
    this.dialogRef.close();
  }
}
