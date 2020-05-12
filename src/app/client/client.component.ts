import {Component, OnInit} from '@angular/core';
import {Client} from "../model/client";
import {ClientService} from "../service/client.service";
import {PopUpClientComponent} from "./pop-up-client/pop-up-client.component";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {MatDialog} from "@angular/material/dialog";
import {PopUpClientDeleteComponent} from "./pop-up-client-delete/pop-up-client-delete.component";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  public clients: Client[];
  public client: Client;
  public displayedColumns: string[] = ['nom', 'prenom', 'adresse', 'codePostal', 'ville', 'telephone', 'email', 'refDevis', 'refFacture', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);
  searchBy: string;

  constructor(private clientService: ClientService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  public getAllClients() {
    this.clientService.getAllClients().subscribe(clients => this.clients = clients);
  }

  openDialog(update: boolean, client?: Client): void {
    const dialogRef = this.dialog.open(PopUpClientComponent, {data: {client, update}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllClients();
      this.clients = result;
    });
  }

  openDialogDelete(client?: Client): void {
    const dialogRef = this.dialog.open(PopUpClientDeleteComponent, {data: {client}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllClients();
      this.clients = result;
    });
  }

  search(): void {
  this.clientService.getClientsByNomAndPrenom(this.searchBy).subscribe(client=> this.clients = client);
   }




  //--------------------------------tableau---------------------------------------------------
  // /**Si le nombre d'éléments sélectionnés correspond au nombre total de lignes */
  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   return numSelected === numRows;
  // }
  //
  // /**Sélectionne toutes les lignes si elles ne sont pas toutes sélectionnées; sinon annule sélection*/
  // masterToggle() {
  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     this.dataSource.data.forEach(row => this.selection.select(row));
  // }
  //
  // /**L'étiquette de la case à cocher sur la ligne passée*/
  // checkboxLabel(row?: Client): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nom + 1}`;
  // }
}
