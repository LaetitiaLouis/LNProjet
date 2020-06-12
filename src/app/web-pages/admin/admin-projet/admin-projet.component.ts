import {Component, OnInit} from '@angular/core';
import {Projet} from "../../../model/projet";
import {ProjetService} from "../../../service/projet.service";
import {ActivatedRoute} from "@angular/router";
import {Admin} from "../../../model/admin";
import {PhotoService} from "../../../service/photo.service";
import {SelectionModel} from "@angular/cdk/collections";
import {Type} from "../../../model/type";
import {MatDialog} from "@angular/material/dialog";
import {PopUpProjetComponent} from "./pop-up-projet/pop-up-projet.component";
import {PopUpDeleteProjetComponent} from "./pop-up-delete-projet/pop-up-delete-projet.component";
import {JwtService} from "../../../security/jwt/jwt.service";

@Component({
  selector: 'app-admin-projet',
  templateUrl: './admin-projet.component.html',
  styleUrls: ['./admin-projet.component.css']
})
export class AdminProjetComponent implements OnInit {

  public projets: Projet[];
  public projet: Projet;
  public displayedColumns: string[] = ['intitule', 'description', 'type', 'update', 'delete'];
  public displayedColumnsXs: string[] = ['select', 'intitule', 'description', 'type'];
  public selection = new SelectionModel<Projet>(true, []);
  public admin: Admin;
  public type: Type;
  public searchBy: string;

  constructor(private projetService: ProjetService,
              private photoService: PhotoService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private jwtService: JwtService) {
  }

  public ngOnInit(): void {
    this.getAllProjets();
  }

  /** Indique si le nombre d'éléments sélectionnés correspond au nombre total de lignes */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.projets.length;
    return numSelected === numRows;

  }

  /** Sélectionne toutes les lignes si elles ne sont pas toutes sélectionnées; sinon supprime sélection */
  public masterToggle() {
    if (this.isAllSelected()) {
      console.log(this.selection);
      this.selection.clear();
    } else {
      this.selection.selected.forEach(c => console.log(c));
      this.projets.forEach(row => this.selection.select(row));
    }
  }

  /** Case à cocher sur la ligne passée */
  public checkboxLabel(row?: Projet): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  /**
   * apelle les projets de l'administrateur connecté
   */
  public getAllProjets() {
    this.projetService.getAllProjets().subscribe(projets => this.projets = projets);
  };

  public openDialog(update: boolean, projet?: Projet): void {
    const login = this.jwtService.getAdmin().login;
    const dialogRef = this.dialog.open(PopUpProjetComponent, {data: {projet, update, login}});
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
    this.projetService.getProjetsByTypeOrIntitule(this.searchBy).subscribe(projets => this.projets = projets);
  };
}



