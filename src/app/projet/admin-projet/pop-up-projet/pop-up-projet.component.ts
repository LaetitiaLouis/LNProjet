import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProjetService} from "../../../service/projet.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

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
              // public dialog: MatDialog,
              // private adminService: AdminService,
              public dialogRef: MatDialogRef<PopUpProjetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
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
    this.projetService.saveProjetInfos(this.formBody.value).subscribe();
    this.dialogRef.close();
  }

  enable(champ: string) {
    if (this.data.update) {
      this.formBody.get(champ).enable();
      this.formBody.get(champ).setValue("");
    }
  }

  onSubmitUpdate() {
    this.projetService.updateProjet(this.formBody.value).subscribe();
    this.dialogRef.close();
  }
}


