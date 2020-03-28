import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {TypeService} from '../../service/type.service';
import {take} from 'rxjs/operators';
import {Type} from '../../model/type';

@Component({
  selector: 'app-filtre-projets',
  templateUrl: './filtre-projets.component.html',
  styleUrls: ['./filtre-projets.component.css']
})
export class FiltreProjetsComponent implements OnInit {
  public types = new FormControl();
  typeList: Type[] = [];
  @Output() typesChangeEmitter = new EventEmitter<string[]>();

  constructor(private typeService: TypeService) {
  }

  ngOnInit() {
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
    this.typesChangeEmitter.emit(event.value);
    }
}
