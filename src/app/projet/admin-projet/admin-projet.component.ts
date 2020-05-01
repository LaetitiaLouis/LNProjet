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

@Component({
  selector: 'app-admin-projet',
  templateUrl: './admin-projet.component.html',
  styleUrls: ['./admin-projet.component.css']
})
export class AdminProjetComponent implements OnInit {

  public displayedColumns: string[] = ['select', 'intitule', 'description', 'type', 'date', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Projet>();
  selection = new SelectionModel<Projet>(true, []);
  public projet: Projet[];
  public admin: Admin;
  public type: Type;

  constructor(private projetService: ProjetService,
              private photoService: PhotoService,
              public dialog: MatDialog,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getProjetByAdmin();
  }

  /**
   * apelle les projets de l'administrateur connecté
   */
  getProjetByAdmin() {
    this.route.paramMap.subscribe(params => this.projetService.getProjetsByAdmin(params.get('login'))
      .subscribe(projets => this.projet = projets));
  }

  openDialog(update: boolean, projet?: Projet): void {
      const dialogRef = this.dialog.open(PopUpProjetComponent, {data: { projet, update}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getProjetByAdmin();
      this.projet = result;
    });
  }

  getAllProjets() {
    this.projetService.getAllProjets();
  }


  getProjetsByType(typeId: number) {
    this.projetService.getProjetsByType(typeId);
  }

  getPhotosByProjet(projetId: number) {
    this.photoService.getPhotosByProjet(projetId);
  }

  updateProjet(projet: Projet) {
    this.projetService.updateProjet(projet);
  }

  createProjet(projet: Projet) {
    this.projetService.saveProjetInfos(projet);
  }

  getProjetsByPrestation(prestationId: number) {
    this.projetService.getProjetsByPrestation(prestationId);
  }

  deleteProjet(projetId: number) {
    this.projetService.deleteProjet(projetId);
  }

  //------------------------------------ pop up-------------------------------------------------

  // onCreate(){
  // const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;
  // dialogConfig.width = "60%";
  // this.dialog.open(PopUpProjetComponent, dialogConfig);
  // }
  //
  // onEdit(row){
  //
  // }
  //--------------------------------tableau---------------------------------------------------
  /**Si le nombre d'éléments sélectionnés correspond au nombre total de lignes */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**Sélectionne toutes les lignes si elles ne sont pas toutes sélectionnées; sinon annule sélection*/
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**L'étiquette de la case à cocher sur la ligne passée*/
  checkboxLabel(row?: Projet): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.intitule + 1}`;
  }

}



