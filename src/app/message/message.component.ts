import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MessageService} from "../service/message.service";
import {Message} from "../model/message";
import {PopUpMessageComponent} from "./pop-up-message/pop-up-message.component";
import {MatDialog} from "@angular/material/dialog";
import {Projet} from "../model/projet";
import {PopUpDeleteProjetComponent} from "../projet/admin-projet/pop-up-delete-projet/pop-up-delete-projet.component";
import {PopUpDeleteMessageComponent} from "./pop-up-message/pop-up-delete-message/pop-up-delete-message.component";
import {SelectionModel} from "@angular/cdk/collections";
import {Client} from "../model/client";
import {PopUpProjetComponent} from "../projet/admin-projet/pop-up-projet/pop-up-projet.component";
import {AdminService} from "../service/admin.service";
import {JwtService} from "../jwt/jwt.service";
import {Admin} from "../model/admin";

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
              public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getAllMessages()
    this.admin = this.jwtService.getAdmin();
  }

  public getAllMessages(): void {
    this.messageService.getAllMessages().subscribe(messages => this.messages = messages);
  }

  // getNewMessage() {
  //   this.messageService.getAllMessages().subscribe(messages=>{
  //     this.messages=messages;
  //     // this.messages=this.messages.filter(message=> !message.vu)})
  // }

  public openDialogDelete(message?: Message): void {
    const dialogRef = this.dialog.open(PopUpDeleteMessageComponent, {data: {message}});
    dialogRef.afterClosed().subscribe(result => {
      this.getAllMessages();
    });
  }

  public updateMessage(message: Message): void {
    message.client = null;
    message.vu = true;
    this.messageService.updateMessage(message).subscribe(result => {
      this.messageChange.emit();
    });
  }
}



