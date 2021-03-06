import {Component, Input, OnInit} from '@angular/core';
import {ProjetService} from '../../../../service/projet.service';
import {take} from 'rxjs/operators';
import {Projet} from '../../../../model/projet';
import {Type} from '../../../../model/type';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-liste-projets',
  templateUrl: './liste-projets.component.html',
  styleUrls: ['./liste-projets.component.css']
})
export class ListeProjetsComponent implements OnInit {
  public projetsList: Projet[];
  @Input() public typesList: Observable<Type[]>;


  constructor(private projetService: ProjetService) {
  }

  public ngOnInit(): void {
  }

  /**
   * Fonction appelée lorsqu'un type de projet est sélectionné depuis filtre projet
   */
  public onClickTypes(event: any) {
    // vide l'existant
    this.projetsList = [];
    // affiche tous les projets
    if (event === 'Tous') {
      this.projetService.getAllProjets().subscribe(projets => this.projetsList = projets)
    } else {
      // sinon parcours tous les nouveaux types
      this.projetService.getProjetsByType(event.id).pipe(take(1)).subscribe(
        {
          next: data => {
            this.projetsList = data;
          },
          error: (data) => {
            console.log(data);
          },
          complete: () => {
          }
        });
    }
  }
}
