import {Component, Input, OnInit} from '@angular/core';
import {AdminService} from "../service/admin.service";
import {Admin} from "../model/admin";
import {DomSanitizer} from "@angular/platform-browser";
import {Photo} from "../model/photo";
import {PhotoService} from "../service/photo.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  public admin: Admin [];
  @Input() photo;
  public photos: Photo [];
  public categories = [];


  // @Input() photos: Admin;

  constructor(private adminService: AdminService,
              private photoService: PhotoService,
              private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.photoService.getPhotosByCategorie('carousel').subscribe(photos => this.photos = photos );
    this.adminService.getAllAdmins().subscribe(admin => this.admin = admin);
  }

  // public afficherCarousel () {
  //   this.photoService.getAllPhotos().subscribe(photosList => {
  //     this.photosList = photosList;
  //     photosList.map(photo => {
  //       if (!this.categories.includes(photo.categorie)) {
  //         this.categories.push(photo.categorie)
  //      }
  //     });
  //   });
  // }

  // public filterCategoriePhotosCarousel () {
  //   if (this.photo.categorie === 'carousel') {
  //     return this.photosList;
  //   }
  // }

  //
  // filterPhotos() {
  //   if (this.filter !== 'toutes') {
  //     this.photos$ = this.photoService.getPhotoByCategorie(this.filter);
  //   } else {
  //     this.photos$ = this.photoService.getAllPhotos();
  //   }
  // }

  // getTrustedUrl(url: string) {
  //   return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  // }
}
