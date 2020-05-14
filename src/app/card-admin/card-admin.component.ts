import {Component, Input, OnInit} from '@angular/core';
import {Admin} from "../model/admin";
import {JwtService} from "../jwt/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrls: ['./card-admin.component.css']
})
export class CardAdminComponent implements OnInit {
  public admin: Admin;
  @Input() public text;
  @Input() public link;

  constructor(private jwtService: JwtService,
              private router: Router) {
  }

  ngOnInit(): void {
    //récupération de l'admin connecté
    // this.admin = this.jwtService.getAdmin();
  }

  // showDetails() {
  //   this.router.navigate(this.link)
  //   ;
  // }
}
