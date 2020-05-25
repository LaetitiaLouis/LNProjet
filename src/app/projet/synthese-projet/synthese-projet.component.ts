import {Component, Input, OnInit} from '@angular/core';
import {Projet} from '../../model/projet';
import {Photo} from "../../model/photo";
import {PhotoService} from "../../service/photo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjetService} from "../../service/projet.service";
import {JwtService} from "../../jwt/jwt.service";
import {DomSanitizer} from "@angular/platform-browser";
import {consoleTestResultHandler} from "tslint/lib/test";


@Component({
  selector: 'app-synthese-projet',
  templateUrl: './synthese-projet.component.html',
  styleUrls: ['./synthese-projet.component.css']
})
export class SyntheseProjetComponent implements OnInit {
  @Input() public projet: Projet;
  public photos: Photo [];
  public photo;

  constructor(private photoService: PhotoService,
              private projetService: ProjetService,
              private route: ActivatedRoute,
              private router: Router,
              public jwtService: JwtService,
              private sanitizer: DomSanitizer) {
  }

  public ngOnInit(): void {
    this.photoService.getPhotosByCategorie('accueil').subscribe(photoResult => {
      this.photos = photoResult;
    });
  }

  getPhotosProjet(id: number) {
    const photos = this.photos.filter(photo => photo.projet.id === id);
    return photos[0].lien;
  }

  showDetails(id: number) {
    this.router.navigate(['/detailProjet', id]);
  }
}

