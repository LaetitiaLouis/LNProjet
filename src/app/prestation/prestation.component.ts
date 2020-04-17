import {Component, OnInit} from '@angular/core';
import {Prestation} from "../model/prestation";
import {PrestationService} from "../service/prestation.service";

@Component({
  selector: 'app-prestation',
  templateUrl: './prestation.component.html',
  styleUrls: ['./prestation.component.css']
})
export class PrestationComponent implements OnInit {
  public prestations: Prestation[];
  public categories = [];

  constructor(private prestationService: PrestationService) {
  }

  public ngOnInit(): void {
    this.prestationService.getAllPrestations().subscribe(prestations => {
      this.prestations = prestations;
      prestations.map(prestation => {
        if (!this.categories.includes(prestation.categorie)) {
          this.categories.push(prestation.categorie);
        }
      });
    });
  }
}
