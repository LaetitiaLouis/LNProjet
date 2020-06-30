import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TypeService} from '../../../../service/type.service';
import {take} from 'rxjs/operators';
import {Type} from '../../../../model/type';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-filtre-projets',
  templateUrl: './filtre-projets.component.html',
  styleUrls: ['./filtre-projets.component.css']
})
export class FiltreProjetsComponent implements OnInit {
  public types = new FormControl();
  typeList: Type[] = [];
  @Output() typesChangeEmitter = new EventEmitter<any>();
  readonly ITEM_ALL = 'Tous les projets';

  constructor(private typeService: TypeService) {
  }

  /**
   * Récupère tous les types de projet et sélectionne par défaut la valeur tous
   */
  public ngOnInit(): void {
    this.typeService.getAllTypes().pipe(take(1)).subscribe(
      {
        next: data => {
          this.typeList = data;
        },
        error: (data) => {
          console.log(data);
        },
        complete: () => {
        }
      });
    this.typesChangeEmitter.emit('Tous');
  }

  /**
   * Affiche les projets du type sélectionné
   */
  public onClickTypes(typeProjet: any): void {
    this.typesChangeEmitter.emit(typeProjet);
  }

  /**
   * Affiche tous les projets
   */
  public onClickProjets(): void{
    this.typesChangeEmitter.emit('Tous');
  }

  /**
   * Pour les petits écrans : Change de type en fonction du type sélectionné
   */
  public onTypesChange(event: any): void {
    this.typesChangeEmitter.emit(event.value);
    if(event.target && event.target.innerText ==='Tous') {
      this.typesChangeEmitter.emit(event.value);
    }
  }
}

