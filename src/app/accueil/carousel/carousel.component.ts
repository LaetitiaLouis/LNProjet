import {Component, Injectable, Input, OnInit} from '@angular/core';
import { Photo} from '../../model/photo';
import {PhotoService} from '../../service/photo.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  // @Injectable()
  // @Input() photos: Photo[];
  // photoList;
  // constructor(private photoService: PhotoService) { }
  //
  public ngOnInit(): void {
  //    if (!this.photos) {
  //      this.photoService.getAllPhotos().subscribe(photoResult => this.photoList = photoResult);
  //    } else {
  //      this.photoList = this.photos;
  //    }
  }

}
