import {Component, OnInit} from '@angular/core';
import {JwtService} from "../../jwt/jwt.service";
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

  onSubmit() {
    this.jwtService.logout();
    this.router.navigate(['/'])
  }
}
