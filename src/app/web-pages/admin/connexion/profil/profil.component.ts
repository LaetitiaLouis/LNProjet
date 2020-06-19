import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../../../../service/admin.service";
import {Admin} from "../../../../model/admin";
import {JwtService} from "../../../../security/jwt/jwt.service";
import {MessageService} from "../../../../service/message.service";
import {Message} from "../../../../model/message";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public admin: Admin;
  public messages: Message[];
  public message: Message;
  @Input() public link;


  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private router: Router,
              private jwtService: JwtService) {
  }

  public ngOnInit(): void {
    this.admin = this.jwtService.getAdmin();
    this.getNewMessage();
  }

  /**
   * Afficher les nouveaux messages
   */
  public getNewMessage() {
    this.messageService.getAllMessages().subscribe(messages=>{
    this.messages=messages;
    this.messages=this.messages.filter(message=> !message.vu)})
  }
}
