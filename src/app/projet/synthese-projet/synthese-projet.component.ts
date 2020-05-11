import {Component, Input, OnInit} from '@angular/core';
import {Projet} from '../../model/projet';
import {Photo} from "../../model/photo";
import {PhotoService} from "../../service/photo.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjetService} from "../../service/projet.service";
import {JwtService} from "../../jwt/jwt.service";
import {DomSanitizer} from "@angular/platform-browser";


@Component({
  selector: 'app-synthese-projet',
  templateUrl: './synthese-projet.component.html',
  styleUrls: ['./synthese-projet.component.css']
})
export class SyntheseProjetComponent implements OnInit {
  @Input() public projet: Projet;
  // @Input() public photos: Photo [];
  // @Input() public photo;
  // public projet: Projet;
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
    this.route.paramMap.subscribe(params => {
      this.photoService.getPhotosByCategorie('Accueil').subscribe(photoResult => this.photos = photoResult);
    })
  }

 /**
   * Redirige vers le le lien fourni dans l'input link
   */
  showDetails(id : number) {
    this.router.navigate(['/detailProjet',id]);
  }
}

