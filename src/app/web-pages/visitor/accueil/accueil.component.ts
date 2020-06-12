import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../../../service/admin.service";
import {Admin} from "../../../model/admin";
import {DomSanitizer} from "@angular/platform-browser";
import {Photo} from "../../../model/photo";
import {PhotoService} from "../../../service/photo.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {

  public admin: Admin [];
  @Input() photo;
  public photos: Photo[];

  constructor(private adminService: AdminService,
              private photoService: PhotoService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.photoService.getPhotosByCategorie('caroussel').subscribe(photos => this.photos = photos);
    this.adminService.getAllAdmins().subscribe(admin => this.admin = admin);
  }
}
