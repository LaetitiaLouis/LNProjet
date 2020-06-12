import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {MatCarouselModule} from '@ngmodule/material-carousel';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {NavbarComponent} from './page/navbar/navbar.component';
import {PageComponent} from './page/page.component';
import {FooterComponent} from './page/footer/footer.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AccueilComponent} from './web-pages/visitor/accueil/accueil.component';
import {PrestationComponent} from './web-pages/visitor/prestation/prestation.component';
import {ProjetComponent} from './web-pages/visitor/projet/projet.component';
import {ContactComponent} from './web-pages/visitor/contact/contact.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FiltreProjetsComponent} from './web-pages/visitor/projet/filtre-projets/filtre-projets.component';
import {ListeProjetsComponent} from './web-pages/visitor/projet/liste-projets/liste-projets.component';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SyntheseProjetComponent} from './web-pages/visitor/projet/synthese-projet/synthese-projet.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MessageComponent} from './web-pages/admin/message/message.component';
import {ConnexionComponent} from './web-pages/admin/connexion/connexion.component';
import {ProfilComponent} from './web-pages/admin/connexion/profil/profil.component';
import {ExtendedModule, FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {DetailProjetComponent} from './web-pages/visitor/projet/detail-projet/detail-projet.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AdminGuard} from "./security/guards/admin.guard";
import {ClientComponent} from './web-pages/admin/client/client.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DeconnexionComponent} from './web-pages/admin/connexion/deconnexion/deconnexion.component';
import {DetailModifProfilComponent} from './web-pages/admin/connexion/profil/detail-modif-profil/detail-modif-profil.component';
import {MatListModule, MatSelectionList} from "@angular/material/list";
import {CreationAdminComponent} from './web-pages/admin/connexion/profil/creation-admin/creation-admin.component';
import {AdminProjetComponent} from './web-pages/admin/admin-projet/admin-projet.component';
import {MatTableModule} from "@angular/material/table";
import {PopUpProjetComponent} from './web-pages/admin/admin-projet/pop-up-projet/pop-up-projet.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import {PopUpClientComponent} from './web-pages/admin/client/pop-up-client/pop-up-client.component';
import {PopUpCreaAdminComponent} from './web-pages/admin/connexion/profil/creation-admin/pop-up-crea-admin/pop-up-crea-admin.component';
import {PopUpMessageComponent} from './web-pages/admin/message/pop-up-message/pop-up-message.component';
import {PopUpClientDeleteComponent} from './web-pages/admin/client/pop-up-client-delete/pop-up-client-delete.component';
import {PopUpModifProfilComponent} from './web-pages/admin/connexion/profil/detail-modif-profil/pop-up-modif-profil/pop-up-modif-profil.component';
import {PopUpDeleteProjetComponent} from './web-pages/admin/admin-projet/pop-up-delete-projet/pop-up-delete-projet.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from "@angular/material/tabs";
import {PopUpDeleteMessageComponent} from './web-pages/admin/message/pop-up-message/pop-up-delete-message/pop-up-delete-message.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

const routes: any[] = [
  {path: '', component: AccueilComponent},
  {path: 'prestation', component: PrestationComponent},
  {path: 'projet', component: ProjetComponent},
  {path: 'admins', component: ConnexionComponent},
  {path: 'profil', component: ProfilComponent, canActivate: [AdminGuard]},
  {path: 'detailProjet/:id', component: DetailProjetComponent},
  {path: 'modifProfil/:login', component: PopUpModifProfilComponent, canActivate: [AdminGuard]},
  {path: 'adminProjet/:login', component: AdminProjetComponent, canActivate: [AdminGuard]},
  {path: 'messages', component: MessageComponent, canActivate: [AdminGuard]},
  {path: 'contact', component: ContactComponent},
  {path: 'clients', component: ClientComponent, canActivate: [AdminGuard]},
  {path: 'ajouterAdmin/:login', component: PopUpCreaAdminComponent, canActivate: [AdminGuard]},
  {path: 'deconnexion', component: DeconnexionComponent, canActivate: [AdminGuard]},
  {path: '**', redirectTo: '', pathMatch: 'full'}
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
    FiltreProjetsComponent,
    ListeProjetsComponent,
    SyntheseProjetComponent,
    MessageComponent,
    ConnexionComponent,
    ProfilComponent,
    DetailProjetComponent,
    ClientComponent,
    DeconnexionComponent,
    DetailModifProfilComponent,
    CreationAdminComponent,
    AdminProjetComponent,
    PopUpProjetComponent,
    PopUpClientComponent,
    PopUpCreaAdminComponent,
    PopUpMessageComponent,
    PopUpClientDeleteComponent,
    PopUpModifProfilComponent,
    PopUpDeleteProjetComponent,
    PopUpDeleteMessageComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return sessionStorage.getItem('access_token');
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
    MatCheckboxModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatListModule,
    MatBadgeModule,
    MatTabsModule,
    MatSlideToggleModule
  ],
  providers: [
    {provide: MAT_DIALOG_DATA, useValue: {}},
    {provide: MatDialogRef, useValue: {}},
    {provide: MatSelectionList}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
