import {Component, OnInit} from '@angular/core';
import {MessageService} from "../service/message.service";
import {Message} from "../model/message";
import {PopUpMessageComponent} from "./pop-up-message/pop-up-message.component";
import {MatDialog} from "@angular/material/dialog";
import {Projet} from "../model/projet";
import {PopUpDeleteProjetComponent} from "../projet/admin-projet/pop-up-delete-projet/pop-up-delete-projet.component";
import {PopUpDeleteMessageComponent} from "./pop-up-message/pop-up-delete-message/pop-up-delete-message.component";
import {SelectionModel} from "@angular/cdk/collections";
import {Client} from "../model/client";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public messages: Message[];
  public message: Message;
  public displayedColumns: string[] = [ 'vu', 'date', 'objet', 'delete', 'detail'];
  selection = new SelectionModel<Message>(true, [])

  constructor(private messageService: MessageService,
              public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.getAllMessages()
  }

  public getAllMessages() {
    this.messageService.getAllMessages().subscribe(messages => this.messages = messages);
  }

  openDetail(): void {
    this.message.contenu;
  }

  openDialogDelete(message?: Message): void {
    const dialogRef = this.dialog.open(PopUpDeleteMessageComponent, {data: {message}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.getAllMessages();
      this.messages = result;
    });
  }

  // onSubmitDelete() {
  //   const messageId = {id:this.message.id, ...this.message}
  //   this.messageService.deleteMessage(this.message).subscribe();
  //
  // }
}
