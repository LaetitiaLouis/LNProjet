import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from '../../service/projet.service';
import {PhotoService} from '../../service/photo.service';
import {Projet} from '../../model/projet';
import {Photo} from "../../model/photo";

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  public projet: Projet;
  public photosList: Photo [];



  constructor(private route: ActivatedRoute,
              private projetService: ProjetService,
              private photoService: PhotoService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params =>
      this.projetService.getProjetsById(+params.get('id')).subscribe(projet => this.projet = projet)
    );
  }

  findPhotosByProjet(photos: Photo[]) {
    this.photoService.getPhotosByProjet(photos).subscribe(photo => this.photosList= photo);
  }
}


