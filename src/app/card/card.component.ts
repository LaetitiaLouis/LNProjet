import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {Photo} from "../model/photo";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() link;
  @Input() text;

  constructor(private router: Router,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  /**
   * Redirige vers le le lien fourni dans l'input link
   */
  showDetails() {
    this.router.navigate(this.link);
  }

  /**
   * Permet de mettre les url des photos via [style.background-image] sans erreur
   * @param L'url en question
   */
  getTrustedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${url})`);
  }
}
