import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from '../../../../service/projet.service';
import {PhotoService} from '../../../../service/photo.service';
import {Projet} from '../../../../model/projet';
import {Photo} from "../../../../model/photo";
import {take} from "rxjs/operators";
import {Observable} from "rxjs";
import {ErrorService} from "../../../../service/error.service";

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
              private es: ErrorService,
              private photoService: PhotoService) {
  }

  /**
   * Affiche un projet et ses photos
   */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const projetId = +params.get('id');
        this.photoService.getPhotosByProjet(projetId).subscribe(photo => {
          this.photosList = photo
        }, _ => this.es.handleError('Aucune photo trouvée pour ce projet'));
        this.projetService.getProjetsById(projetId).subscribe(projet => this.projet = projet)
      }
    )
  }
}

