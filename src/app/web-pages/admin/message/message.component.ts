import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "../../../service/message.service";
import {Message} from "../../../model/message";
import {PopUpMessageComponent} from "./pop-up-message/pop-up-message.component";
import {MatDialog} from "@angular/material/dialog";
import {Projet} from "../../../model/projet";
import {PopUpDeleteProjetComponent} from "../admin-projet/pop-up-delete-projet/pop-up-delete-projet.component";
import {PopUpDeleteMessageComponent} from "./pop-up-message/pop-up-delete-message/pop-up-delete-message.component";
import {SelectionModel} from "@angular/cdk/collections";
import {Client} from "../../../model/client";
import {PopUpProjetComponent} from "../admin-projet/pop-up-projet/pop-up-projet.component";
import {AdminService} from "../../../service/admin.service";
import {JwtService} from "../../../security/jwt/jwt.service";
import {Admin} from "../../../model/admin";
import {ErrorService} from "../../../service/error.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public messages: Message[];
  public message: Message;
  public admin: Admin;
  @Output() messageChange = new EventEmitter();

  constructor(private messageService: MessageService,
              private adminService: AdminService,
              private jwtService: JwtService,
              private error: ErrorService,
              public dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.getAllMessages();
    this.admin = this.jwtService.getAdmin();
  }

  /**
   * Affiche les messages
   */
  public getAllMessages(): void {
    this.messageService.getAllMessages().subscribe(messages =>{ this.messages = messages; this.sortMessages()});

  }

  /**
   * Trie les messages par statut et date et par ordre décroissant
   */
  public sortMessages (): void{
    this.messages.sort((a,b)=>b.id -a.id);
    const vus = this.messages.filter(message => message.vu);
    const noVus = this.messages.filter(message => !message.vu);
    this.messages = noVus.concat(vus);
  }

  /**
   * Ouvre popUpDeleteMessage
   */
  public openDialogDelete(message?: Message): void {
    const dialogRef = this.dialog.open(PopUpDeleteMessageComponent, {data: {message}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllMessages();
    });
  }

  /**
   * Modifie le statut du message
   */
  public updateMessage(message: Message): void {
    message.client = null;
    message.vu = true;
    this.messageService.updateMessage(message).subscribe(result => {
      this.messageChange.emit();
      this.sortMessages();
      this.error.handleSuccess("Le statut de votre message a bien été modifié")
    });
    _=>this.error.handleError("Erreur : votre message n'a pas été modifié")
  }
}


