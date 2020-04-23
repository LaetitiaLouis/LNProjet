import {Component, Input, OnInit} from '@angular/core';
import {Projet} from '../../model/projet';
import {Photo} from "../../model/photo";
import {PhotoService} from "../../service/photo.service";
import {ActivatedRoute} from "@angular/router";
import {ProjetService} from "../../service/projet.service";


@Component({
  selector: 'app-synthese-projet',
  templateUrl: './synthese-projet.component.html',
  styleUrls: ['./synthese-projet.component.css']
})
export class SyntheseProjetComponent implements OnInit {
  @Input() public projet: Projet = null;
  @Input() public photos: Photo [];


  constructor(private photoService: PhotoService,
              private projetService: ProjetService,
              private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projetId = params.get('id');
      this.photoService.getPhotosByProjet(0).subscribe(photoResult => this.photos = photoResult)
      this.photoService.getPhotosByCategorie('Accueil').subscribe(photoResult => this.photos = photoResult);
    })
  }
}
