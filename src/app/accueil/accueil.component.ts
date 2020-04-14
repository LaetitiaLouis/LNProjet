import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../service/admin.service";
import {Admin} from "../model/admin";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  public admin: Admin [];

  // @Input() photos: Admin;

  constructor(private adminService: AdminService,
              private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.adminService.getAllAdmins().subscribe(admin => this.admin = admin);
  }

  // getTrustedUrl(url: string) {
  //   return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  // }
}
