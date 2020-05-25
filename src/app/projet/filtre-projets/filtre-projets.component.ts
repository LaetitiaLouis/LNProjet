import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TypeService} from '../../service/type.service';
import {take} from 'rxjs/operators';
import {Type} from '../../model/type';
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

  public onClickTypes(typeProjet: any): void {
    console.log(typeProjet.libelle);
    this.typesChangeEmitter.emit(typeProjet);
  }

  public onClickProjets(): void{
    this.typesChangeEmitter.emit('Tous');
  }

  public onTypesChange(event: any): void {
    console.log(event.value);
    this.typesChangeEmitter.emit(event.value);
    if(event.target && event.target.innerText ==='Tous') {
      this.typesChangeEmitter.emit(event.value);
    }
  }
}

