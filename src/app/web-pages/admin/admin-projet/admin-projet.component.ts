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
  public displayedColumnsXs: string[] = ['select', 'intitule', 'description'];
  public selection = new SelectionModel<Projet>(true, []);
  public admin: Admin;
  public type: Type;
  public searchBy: string;
  public selected: Projet;

  constructor(private projetService: ProjetService,
              private photoService: PhotoService,
              public dialog: MatDialog,
              private route: ActivatedRoute,
              private jwtService: JwtService) {
  }

  public ngOnInit(): void {
    this.getAllProjets();
    this.selection.changed.subscribe(change => { this.selected = change.added[0]});
  }

  /**
   * Indique si le nombre d'éléments sélectionnés correspond au nombre total de lignes
   */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.projets.length;
    return numSelected === numRows;

  }

  /**
   * Sélectionne toutes les lignes si elles ne sont pas toutes sélectionnées; sinon supprime sélection
   */
  public masterToggle() {
    if (this.isAllSelected()) {
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
   * Appelle les projets
   */
  public getAllProjets() {
    this.projetService.getAllProjets().subscribe(projets => this.projets = projets);
  };

  /**
   * Ouvre la popup correspondant au PopUpProjetComponent et récupère le projet à modifier si update
   * Passe le login admin en paramètre
   */
  public openDialog(update: boolean, projet?: Projet): void {
    const p = projet?projet:this.selected;
    this.selection.clear();
    const login = this.jwtService.getAdmin().login;
    const dialogRef = this.dialog.open(PopUpProjetComponent, {data: {projet:p, update, login}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjets();
    });
  }

  /**
   * Ouvre la popup correspondant au PopUpDeleteProjetcomponent et récupère le projet à supprimer
   */
  public openDialogDelete(projet?: Projet): void {
    const p = projet?projet:this.selected;
    this.selection.clear();
    const dialogRef = this.dialog.open(PopUpDeleteProjetComponent, {data: {projet:p}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllProjets();
    });
  }

  /**
   * Recherche un projet par son intitulé ou par son type
   */
  public search(): void {
    this.projetService.getProjetsByTypeOrIntitule(this.searchBy).subscribe(projets => {
      this.projets = projets;
      this.searchBy = '';
    });
  };
}



