import {Component, Injectable, Input, OnInit} from '@angular/core';
import {Photo} from '../../model/photo';
import {PhotoService} from '../../service/photo.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() public photos: Photo[];
  public photosList: Photo [];
  public categories = [];

  constructor(private photoService: PhotoService) {
  }

  public ngOnInit(): void {
    this.photoService.getAllPhotos().subscribe(photosList => {
      this.photosList = photosList;
      photosList.map(photo => {
        if (!this.categories.includes(photo.categorie)) {
          this.categories.push(photo.categorie)
        }
      });
    });
  }
}
      // photoResult => this.photoList = photoResult);

// this.prestationService.getAllPrestations().subscribe(prestations => {
//   this.prestations = prestations;
//   prestations.map(prestation => {
//     if (!this.categories.includes(prestation.categorie)) {
//       this.categories.push(prestation.categorie);
//     }
//   });
// });
// }
// }

