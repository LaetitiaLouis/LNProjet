import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Projet} from '../model/projet';
import {ProjetService} from '../service/projet.service';
import {Photo} from '../model/photo';
import {PhotoService} from '../service/photo.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  projet$: Observable<Projet>;
  photos$: Observable<Photo[]>;

  constructor(private projetService: ProjetService,
              private route: ActivatedRoute,
              private photoService: PhotoService) {
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const projetId = +params.get('id');
        this.projet$ = this.projetService.getProjetsById(projetId);
        this.photos$ = this.photoService.getPhotosByCategorie(projetId);
      }
    );
  }
}
