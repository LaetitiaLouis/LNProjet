import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TypeService} from '../../service/type.service';
import {take} from 'rxjs/operators';
import {Type} from '../../model/type';
import {Subscription} from 'rxjs';

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
  private subscription: Subscription = null;

  constructor(private typeService: TypeService) {
  }
  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
  }

  public onTypesChange(event: any): void {
    // this.typesChangeEmitter.emit(event.value);
    // console.log(event.target.innerText);
    const item = this.typeList.filter(typeItem => typeItem.libelle === event.target.innerText)[0];
    this.typesChangeEmitter.emit(item);
  }
}
