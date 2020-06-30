import {Component, OnInit} from '@angular/core';
import {JwtService} from "../../security/jwt/jwt.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public jwtService: JwtService,
              private router: Router) {
  }

  public ngOnInit(): void {
  }

  /**
   * renvoie à la page d'accueil après déconnexion
   */
  onSubmit() {
    this.router.navigate(['/']).then(_=> this.jwtService.logout());
  }
}
