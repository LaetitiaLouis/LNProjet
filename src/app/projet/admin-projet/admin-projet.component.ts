import {Component, OnInit} from '@angular/core';
import {Projet} from "../../model/projet";
import {ProjetService} from "../../service/projet.service";
import {ActivatedRoute} from "@angular/router";
import {Admin} from "../../model/admin";
import {PhotoService} from "../../service/photo.service";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Type} from "../../model/type";
import {MatDialog} from "@angular/material/dialog";
import {PopUpProjetComponent} from "./pop-up-projet/pop-up-projet.component";
import {PopUpDeleteProjetComponent} from "./pop-up-delete-projet/pop-up-delete-projet.component";
import {JwtService} from "../../jwt/jwt.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-admin-projet',
  templateUrl: './admin-projet.component.html',
  styleUrls: ['./admin-projet.component.css']
})
export class AdminProjetComponent implements OnInit {

  public projets: Observable<Projet[]>;
  public displayedColumns: string[] = ['intitule', 'description', 'type', 'update', 'delete'];
  public selection = new SelectionModel<Projet>(true, []);
  public admin: Admin;
  public type: Type;
  public searchBy: string;

  // public searchForm: FormGroup;

  constructor(private projetService: ProjetService,
              private photoService: PhotoService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.getAllProjets();
  }

  /**
   * apelle les projets de l'administrateur connecté
   */
  public getAllProjets() {
    this.projets = this.projetService.getAllProjets();
    };

  public openDialog(update: boolean, projet?: Projet): void {
    const login = this.jwtService.getAdmin().login;
    const dialogRef = this.dialog.open(PopUpProjetComponent, {data: {projet, update,login}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjets();
    });
  }

  public openDialogDelete(projet?: Projet): void {
    const dialogRef = this.dialog.open(PopUpDeleteProjetComponent, {data: {projet}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjets();
    });
  }

  public search(): void {
    this.projets = this.projetService.getProjetsByTypeAndIntitule(this.searchBy);
  };
}



