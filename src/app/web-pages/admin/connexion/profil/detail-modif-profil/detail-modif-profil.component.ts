import {Component, Input, OnInit} from '@angular/core';
import {Admin} from "../../../../../model/admin";
import {JwtService} from "../../../../../security/jwt/jwt.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdminService} from "../../../../../service/admin.service";
import {ErrorService} from "../../../../../service/error.service";
import {catchError, map, tap} from "rxjs/operators";
import {Client} from "../../../../../model/client";
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

  public ngOnInit(): void {
    this.formProfil();
  }

  /**
   *  création du formulaire profil
   */
  public formProfil() {
    //récupération de l'admin connecté
    this.admin = this.jwtService.getAdmin();
    this.formBody = this.fb.group({
      prenom: [this.admin.prenom],
      login: [this.admin.login],
      password: [this.admin.password],
      presentation: [this.admin.presentation],
      photo: [this.admin.photo]
    })
  }

  /**
   * Ouverture de la popup modifProfil
   * @param admin
   */
  public openDialog(admin: Admin): void {
    const dialogRef = this.dialog.open(PopUpModifProfilComponent, {data: {admin}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.admin = result;
    });
  }
}
