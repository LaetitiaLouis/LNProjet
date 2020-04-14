import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {MatCarouselModule} from '@ngmodule/material-carousel';
import { AppComponent } from './app.component';
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
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FiltreProjetsComponent } from './projet/filtre-projets/filtre-projets.component';
import { ListeProjetsComponent } from './projet/liste-projets/liste-projets.component';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import { SyntheseProjetComponent } from './projet/synthese-projet/synthese-projet.component';
import {MatCardImage, MatCardModule} from '@angular/material/card';
import { DetailPrestationComponent } from './prestation/detail-prestation/detail-prestation.component';
import { RegisterComponent } from './register/register.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MessageComponent } from './message/message.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './connexion/profil/profil.component';
import {FlexLayoutModule, FlexModule, ExtendedModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import { DetailProjetComponent } from './projet/detail-projet/detail-projet.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { CardComponent } from './card/card.component';

const routes: any[] = [
  {path: '', component: AccueilComponent},
  {path: 'prestation', component: PrestationComponent},
  {path: 'projet', component: ProjetComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'connexion', component: ConnexionComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'detailProjet/:id', component: DetailProjetComponent}
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
    CarouselComponent,
    FiltreProjetsComponent,
    ListeProjetsComponent,
    SyntheseProjetComponent,
    DetailPrestationComponent,
    RegisterComponent,
    MessageComponent,
    ConnexionComponent,
    ProfilComponent,
    DetailProjetComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatRadioModule,
    FormsModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCarouselModule,
    MatCarouselModule.forRoot(),
    MatCardModule,
    MatButtonToggleModule,
    FlexLayoutModule,
    ExtendedModule,
    FlexModule,
    MatInputModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
