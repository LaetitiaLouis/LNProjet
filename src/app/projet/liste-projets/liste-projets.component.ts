import {Component, Input, OnInit} from '@angular/core';
import {ProjetService} from '../../service/projet.service';
import {take} from 'rxjs/operators';
import {Projet} from '../../model/projet';
import {Type} from '../../model/type';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-liste-projets',
  templateUrl: './liste-projets.component.html',
  styleUrls: ['./liste-projets.component.css']
})
export class ListeProjetsComponent implements OnInit {
  public projetsList: Projet[] = null;
  @Input() public typesList: Observable <Type[]> = null;
  public machin: any;

  constructor(private projetService: ProjetService) { }

  public ngOnInit(): void {
    // this.projetService.getAllProjets().pipe(take(1)).subscribe(
    //   {
    //     next: data => {
    //       this.projetsList  = data;
    //     },
    //     error: (data) => {
    //       console.log(data);
    //     },
    //     complete: () => {
    //     }
    //   });
    if (this.typesList) {
      console.log('saucisse');
    }
  }

}
