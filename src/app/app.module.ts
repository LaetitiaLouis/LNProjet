import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ExtendedModule, FlexModule } from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { NavbarComponent } from './page/navbar/navbar.component';
import { PageComponent } from './page/page.component';
import { FooterComponent } from './page/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AccueilComponent } from './accueil/accueil.component';
import { PrestationComponent } from './prestation/prestation.component';
import { ProjetComponent } from './projet/projet.component';
import { ContactComponent } from './contact/contact.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { CarouselComponent } from './accueil/carousel/carousel.component';
const routes: any[] = [
  {path: '', component: AccueilComponent},
  {path: 'prestations', component: PrestationComponent},
  {path: 'projets', component: ProjetComponent},
  {path: 'contact', component: ContactComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PageComponent,
    FooterComponent,
    AccueilComponent,
    PrestationComponent,
    ProjetComponent,
    ContactComponent,
    CarouselComponent
  ],
  imports: [
    BrowserModule,
    FlexModule,
    ExtendedModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
