import { Component, OnInit } from '@angular/core';
import {Admin} from "../../model/admin";
import {AdminService} from "../../service/admin.service";
import {JwtService} from "../../jwt/jwt.service";

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.css']
})
export class DeconnexionComponent implements OnInit {
  public admin: Admin;

  constructor(private adminService: AdminService,
              private jwtService: JwtService) { }

  ngOnInit(): void {
    this.admin = this.jwtService.getAdmin();
  }
  onSubmit() {
    this.jwtService.logout();
  }
}
