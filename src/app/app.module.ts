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
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AdminGuard} from "./guards/admin.guard";
import { DetailProfilComponent } from './connexion/profil/detail-profil/detail-profil.component';
import { ClientComponent } from './client/client.component';

const routes: any[] = [
  {path: '', component: AccueilComponent},
  {path: 'prestation', component: PrestationComponent},
  {path: 'projet', component: ProjetComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'admins', component: ConnexionComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'detailProjet/:id', component: DetailProjetComponent},
  {path: 'detailProfil/:login', component: DetailProfilComponent, canActivate:[AdminGuard]},
  {path: 'messages', component: MessageComponent, canActivate:[AdminGuard]},
  {path: 'clients', component: ClientComponent, canActivate:[AdminGuard]}
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
    CardComponent,
    DetailProfilComponent,
    ClientComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: [environment.server],
        blacklistedRoutes: [`${environment.apiUrl}/sign-in`]
      }
    }),
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
    MatExpansionModule,
    MatSidenavModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
