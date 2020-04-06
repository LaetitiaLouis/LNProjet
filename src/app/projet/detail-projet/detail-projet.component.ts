import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjetService} from '../../service/projet.service';
import {PhotoService} from '../../service/photo.service';
import {Observable} from 'rxjs';
import {Projet} from '../../model/projet';
import {Photo} from '../../model/photo';

@Component({
  selector: 'app-detail-projet',
  templateUrl: './detail-projet.component.html',
  styleUrls: ['./detail-projet.component.css']
})
export class DetailProjetComponent implements OnInit {
  projet$: Observable<Projet>;
  photos$: Observable<Photo[]>;
  @Input() public projet: Projet = null;

  constructor(private route: ActivatedRoute,
              private projetService: ProjetService,
              private photoService: PhotoService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const projetId = +params.get('id');
      this.projet$ = this.projetService.getProjetsById(projetId);
      this.photos$ = this.photoService.getPhotosByCategorie(projetId);
    }
    );
  }

}
