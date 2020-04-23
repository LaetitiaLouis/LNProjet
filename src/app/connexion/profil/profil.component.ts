import {Component, OnInit} from '@angular/core';
import {AdminService} from "../../service/admin.service";
import {Admin} from "../../model/admin";
import {JwtService} from "../../jwt/jwt.service";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public admin: Admin;

  constructor(private adminService: AdminService,
              private jwtService: JwtService) {
  }

  ngOnInit(): void {
    this.admin = this.jwtService.getAdmin();
    }

  onSubmit() {
    this.jwtService.logout();
  }

}
