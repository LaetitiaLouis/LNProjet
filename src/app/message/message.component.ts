import {Component, OnInit} from '@angular/core';
import {MessageService} from "../service/message.service";
import {Message} from "../model/message";
import {PopUpMessageComponent} from "./pop-up-message/pop-up-message.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  public messages: Message[];
  public message: Message;
  isVu= false;


  constructor(private messageService: MessageService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllMessages()
  }

  public getAllMessages() {
    this.messageService.getAllMessages().subscribe(messages => this.messages = messages);
  }

  openDialog (message?: Message): void {
    const dialogRef = this.dialog.open(PopUpMessageComponent, {data: {message}});
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

alertNewMessage () {
  this.message.vu = false;
}
  // onSubmitDelete() {
  //   const messageId = {id:this.message.id, ...this.message}
  //   this.messageService.deleteMessage(this.message).subscribe();
  //
  // }
}
