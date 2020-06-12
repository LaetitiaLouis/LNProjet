import {Component, OnInit} from '@angular/core';
import {Projet} from '../../../model/projet';
import {JwtService} from "../../../security/jwt/jwt.service";

@Component({
  selector: 'app-projet',
  templateUrl: './projet.component.html',
  styleUrls: ['./projet.component.css']
})
export class ProjetComponent implements OnInit {
  public projets: Projet[];

  constructor(public jwtService: JwtService) {
  }

  public ngOnInit(): void {
  }

}
