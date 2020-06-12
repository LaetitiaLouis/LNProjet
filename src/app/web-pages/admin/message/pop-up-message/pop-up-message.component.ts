import {Component, Inject, OnInit} from '@angular/core';
import {Client} from "../../../../model/client";
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {Message} from "../../../../model/message";
import {MessageService} from "../../../../service/message.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PopUpClientComponent} from "../../client/pop-up-client/pop-up-client.component";

@Component({
  selector: 'app-pop-up-message',
  templateUrl: './pop-up-message.component.html',
  styleUrls: ['./pop-up-message.component.css']
})
export class PopUpMessageComponent implements OnInit {
  public messages: Message[];
  public message: Message;
  // public displayedColumns: string[] = ['nom', 'objet', 'date', 'contenu', 'vu', 'statut', 'update', 'delete'];
  // public dataSource = new MatTableDataSource<Message>();
  // selection = new SelectionModel<Message>(true, []);

  constructor(private messageService: MessageService,
              private route: ActivatedRoute,
              public dialogRef: MatDialogRef<PopUpMessageComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    // this.messages.push(this.data.message);
    // console.log(this.data);

  }

  onSubmitDelete() {
    this.messageService.deleteMessage(this.data.message).subscribe();
    this.dialogRef.close();

  }

  closePopUp() {
    this.dialogRef.close();
  }
}

