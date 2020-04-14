import {Component, Input, OnInit} from '@angular/core';
import {Projet} from '../../model/projet';
import {Photo} from "../../model/photo";
import {PhotoService} from "../../service/photo.service";


@Component({
  selector: 'app-synthese-projet',
  templateUrl: './synthese-projet.component.html',
  styleUrls: ['./synthese-projet.component.css']
})
export class SyntheseProjetComponent implements OnInit {
  @Input() public projet: Projet = null;
  @Input() public photosList: Photo [];

  constructor(private photoService: PhotoService) {
  }

  public ngOnInit(): void {
  }

  findPhotosByCategorie() {
    this.photoService.getPhotosByCategorie("Accueil").subscribe(photoResult => this.photosList = photoResult);
  }
}
