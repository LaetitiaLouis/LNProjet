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
  public displayedColumns: string[] = ['select', 'nomPrenom',  'adresse', 'telephone', 'email', 'refDevis', 'refFacture', 'update', 'delete'];
  public dataSource = new MatTableDataSource<Client>();
  selection = new SelectionModel<Client>(true, []);
  searchBy: string;
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  // selection = new SelectionModel<PeriodicElement>(true, []);


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
      this.getAllClients();
      // this.clients = result;
    });
  }

  openDialogDelete(client?: Client): void {
    const dialogRef = this.dialog.open(PopUpClientDeleteComponent, {data: {client}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllClients();
      // this.clients = result;
    });
  }

  search(): void {
    this.clientService.getClientsByNomAndPrenom(this.searchBy).subscribe(client => this.clients = client);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Client): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.nom + 1}`;
  }

}

