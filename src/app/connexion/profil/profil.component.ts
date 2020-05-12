import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {Admin} from "../../model/admin";
import {JwtService} from "../../jwt/jwt.service";
import {MessageService} from "../../service/message.service";
import {Message} from "../../model/message";
import {Router} from "@angular/router";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public admin: Admin;
  public messages: Message[];
  public message: Message;
  // @Input() public text;
  // @Input() public title;
  @Input() public link;


  constructor(private adminService: AdminService,
              private messageService: MessageService,
              private router: Router,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.admin = this.jwtService.getAdmin();
    this.getNewMessage();
  }

  // showDetails() {
  //   this.router.navigate(this.link);
  // }

  getNewMessage() {
    this.messageService.getAllMessages().subscribe(messages=>{
    this.messages=messages;
    this.messages=this.messages.filter(message=> !message.vu)})
  }
}
