import {Component, Input, OnInit} from '@angular/core';
import {Admin} from "../../../model/admin";
import {JwtService} from "../../../jwt/jwt.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../service/admin.service";
import {ErrorService} from "../../../service/error.service";
import {catchError, map, tap} from "rxjs/operators";
import {Client} from "../../../model/client";
import {PopUpClientComponent} from "../../../client/pop-up-client/pop-up-client.component";
import {PopUpModifProfilComponent} from "./pop-up-modif-profil/pop-up-modif-profil.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-detail-modif-profil',
  templateUrl: './detail-modif-profil.component.html',
  styleUrls: ['./detail-modif-profil.component.css']
})
export class DetailModifProfilComponent implements OnInit {
  public admin: Admin;
  public formBody: FormGroup;

  constructor(
    private jwtService: JwtService,
    private adminService: AdminService,
    private es: ErrorService,
    private fb: FormBuilder,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.formProfil();
  }

  // récupération de l'admin connecté
  public formProfil() {
    this.admin = this.jwtService.getAdmin();
    this.formBody = this.fb.group({
      prenom: [this.admin.prenom],
      login: [this.admin.login],
      password: [this.admin.password],
      presentation: [this.admin.presentation],
      photo: [this.admin.photo]
    })
  }
  // enable(champ: string) {
  //   this.formBody.get(champ).enable();
  //   this.formBody.get(champ).setValue("");
  // }

  openDialog(admin: Admin): void {
    const dialogRef = this.dialog.open(PopUpModifProfilComponent, {data: {admin}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.admin = result;
    });
  }

  // onSubmitUpdate() {
  //   let admin = {...this.admin, ...this.formBody.value};
  //   if (!admin.password) {
  //     admin.password = ""
  //   }
  //   ;
  //   this.adminService.updatedAdmin(admin)
  //     .subscribe((admin => {
  //         this.es.handleSuccess("Profil modifié");
  //         console.log(admin);
  //       }),
  //       this.es.handleError("Erreur"))
  //   ;
  // }
}
