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
import {AccueilComponent} from './accueil/accueil.component';
import {PrestationComponent} from './prestation/prestation.component';
import {ProjetComponent} from './projet/projet.component';
import {ContactComponent} from './contact/contact.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {CarouselComponent} from './accueil/carousel/carousel.component';
import {MatRadioModule} from '@angular/material/radio';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FiltreProjetsComponent} from './projet/filtre-projets/filtre-projets.component';
import {ListeProjetsComponent} from './projet/liste-projets/liste-projets.component';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SyntheseProjetComponent} from './projet/synthese-projet/synthese-projet.component';
import {MatCardModule} from '@angular/material/card';
import {RegisterComponent} from './register/register.component';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MessageComponent} from './message/message.component';
import {ConnexionComponent} from './connexion/connexion.component';
import {ProfilComponent} from './connexion/profil/profil.component';
import {ExtendedModule, FlexLayoutModule, FlexModule} from '@angular/flex-layout';
import {MatInputModule} from '@angular/material/input';
import {DetailProjetComponent} from './projet/detail-projet/detail-projet.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {CardComponent} from './card/card.component';
import {JwtModule} from "@auth0/angular-jwt";
import {environment} from "../environments/environment";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatSidenavModule} from "@angular/material/sidenav";
import {AdminGuard} from "./guards/admin.guard";
import {ModifProfilComponent} from './connexion/profil/modif-profil/modif-profil.component';
import {ClientComponent} from './client/client.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {DeconnexionComponent} from './connexion/deconnexion/deconnexion.component';
import { DetailModifProfilComponent } from './connexion/profil/detail-modif-profil/detail-modif-profil.component';
import {CardAdminComponent} from "./card-admin/card-admin.component";
import {MatListModule, MatSelectionList} from "@angular/material/list";
import { CreationAdminComponent } from './connexion/profil/creation-admin/creation-admin.component';
import { AdminProjetComponent } from './projet/admin-projet/admin-projet.component';
import {MatTableModule} from "@angular/material/table";
import { PopUpProjetComponent } from './projet/admin-projet/pop-up-projet/pop-up-projet.component';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatSortModule} from "@angular/material/sort";
import { PopUpClientComponent } from './client/pop-up-client/pop-up-client.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { PopUpCreaAdminComponent } from './connexion/profil/creation-admin/pop-up-crea-admin/pop-up-crea-admin.component';
import { PopUpMessageComponent } from './message/pop-up-message/pop-up-message.component';
import { PopUpClientDeleteComponent } from './client/pop-up-client-delete/pop-up-client-delete.component';
import { PopUpModifProfilComponent } from './connexion/profil/detail-modif-profil/pop-up-modif-profil/pop-up-modif-profil.component';
import { PopUpDeleteProjetComponent } from './projet/admin-projet/pop-up-delete-projet/pop-up-delete-projet.component';
import {MatBadgeModule} from '@angular/material/badge';
import {MatTabsModule} from "@angular/material/tabs";
import { AdminComponent } from './admin/admin.component';
import { PopUpDeleteMessageComponent } from './message/pop-up-message/pop-up-delete-message/pop-up-delete-message.component';

const routes: any[] = [
  {path: '', component: AccueilComponent},
  {path: 'prestation', component: PrestationComponent},
  {path: 'projet', component: ProjetComponent},
  {path: 'admins', component: ConnexionComponent},
  {path: 'profil', component: ProfilComponent},
  {path: 'detailProjet/:id', component: DetailProjetComponent},
  {path: 'detailProfil/:login', component: DetailModifProfilComponent},
  {path: 'ajouterAdmin/:login', component: CreationAdminComponent},
  {path: 'adminProjet/:login', component: AdminProjetComponent},
  {path: 'messages', component: MessageComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'clients', component: ClientComponent},
  {path: 'ajouterAdmin/:login', component: CreationAdminComponent},
  {path: 'deconnexion', component: DeconnexionComponent}
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
    RegisterComponent,
    MessageComponent,
    ConnexionComponent,
    ProfilComponent,
    DetailProjetComponent,
    CardComponent,
    ModifProfilComponent,
    ClientComponent,
    DeconnexionComponent,
    DetailModifProfilComponent,
    CardAdminComponent,
    CreationAdminComponent,
    AdminProjetComponent,
    PopUpProjetComponent,
    PopUpClientComponent,
    SearchBarComponent,
    PopUpCreaAdminComponent,
    PopUpMessageComponent,
    PopUpClientDeleteComponent,
    PopUpModifProfilComponent,
    PopUpDeleteProjetComponent,
    AdminComponent,
    PopUpDeleteMessageComponent
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
        MatCheckboxModule,
        MatTableModule,
        MatDialogModule,
        MatSortModule,
        MatListModule,
        MatBadgeModule,
        MatTabsModule
    ],
  providers: [
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {provide: MatSelectionList}
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
