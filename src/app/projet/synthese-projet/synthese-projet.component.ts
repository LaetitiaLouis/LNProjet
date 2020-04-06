import {Component, Input, OnInit} from '@angular/core';
import {Projet} from '../../model/projet';



@Component({
  selector: 'app-synthese-projet',
  templateUrl: './synthese-projet.component.html',
  styleUrls: ['./synthese-projet.component.css']
})
export class SyntheseProjetComponent implements OnInit {
  @Input() public projet: Projet = null;

  constructor() { }

  public ngOnInit(): void {
    }
}
