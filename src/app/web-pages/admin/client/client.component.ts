import {Component, OnInit} from '@angular/core';
import {Client} from "../../../model/client";
import {ClientService} from "../../../service/client.service";
import {PopUpClientComponent} from "./pop-up-client/pop-up-client.component";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {PopUpClientDeleteComponent} from "./pop-up-client-delete/pop-up-client-delete.component";
import {Admin} from "../../../model/admin";
import {Projet} from "../../../model/projet";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  public clients: Client[];
  public client: Client;
  public displayedColumnsXs: string[] = ['select', 'nomPrenom', 'adresse', 'telephone', 'email', 'refDevis', 'refFacture'];
  public displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'telephone', 'email', 'refDevis', 'refFacture', 'update', 'delete'];
  public selection = new SelectionModel<Client>(true, []);
  public searchBy: string;
  public admin: Admin;
  public selected: Client;

  constructor(private clientService: ClientService,
              public dialog: MatDialog) {
  }

  ngOnInit() : void {
    this.getAllClients();
    this.selection.changed.subscribe(change => { this.selected = change.added[0]});
  }

  /**
   * Affiche la liste des clients
   */
  public getAllClients() {
    this.clients = [];
    this.clientService.getAllClients().subscribe(clients => this.clients = clients);
  }

  /**
   * Affiche les clients par nom ou prénom
   */
  public search(): void {
    this.clientService.getClientsByNomOrPrenom(this.searchBy).subscribe(client => this.clients = client);
    this.searchBy = '';
  }

  /**
   * Ouvre la popup client
   */
  public openDialog(update: boolean, client?: Client): void {
    const c = client?client:this.selected;
    this.selection.clear();
    const dialogRef = this.dialog.open(PopUpClientComponent, {data: {client:c, update}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

  /**
   * Ouvre la popup delete client
   */
  public openDialogDelete(client?: Client): void {
    const c = client?client:this.selected;
    this.selection.clear();
    const dialogRef = this.dialog.open(PopUpClientDeleteComponent, {data: {client:c}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
    });
  }

  /**
   * Indique si le nombre d'éléments sélectionnés correspond au nombre total de lignes
   */
  public isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.clients.length;
    return numSelected === numRows;

  }

  /**
   * Sélectionne toutes les lignes si elles ne sont pas toutes sélectionnées; sinon supprime sélection
   */
  public masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.selected.forEach(c=> console.log(c));
    this.clients.forEach(row => this.selection.select(row));
    }
  }

  /**
   * Case à cocher sur la ligne passée
   */
  public checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }
}


