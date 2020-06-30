import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProjetService} from "../../../../service/projet.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorService} from "../../../../service/error.service";
import {JwtService} from "../../../../security/jwt/jwt.service";
import {consoleTestResultHandler} from "tslint/lib/test";
import {TypeService} from "../../../../service/type.service";
import {Type} from "../../../../model/type";
import {map, tap} from "rxjs/operators";
import {Photo} from "../../../../model/photo";

@Component({
  selector: 'app-pop-up-projet',
  templateUrl: './pop-up-projet.component.html',
  styleUrls: ['./pop-up-projet.component.css']
})
export class PopUpProjetComponent implements OnInit {
  public formBody: FormGroup;
  public photoFormArray: FormArray = new FormArray([]);
  // TODO table catégorie back ou ENUM
  public photosCategories: string[] = ['accueil', 'projet'];
  public typesProjets: Type[];


  constructor(private fb: FormBuilder,
              private projetService: ProjetService,
              private typeService: TypeService,
              private route: ActivatedRoute,
              private jwtService: JwtService,
              public dialogRef: MatDialogRef<PopUpProjetComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private es: ErrorService) {
  }

  public ngOnInit(): void {
    this.getTypesProjets();
    this.formProjet();
    this.initPhotos();
  }

  /**
   * Affiche la liste de projets
   */
  public getTypesProjets() {
    this.typeService.getAllTypes().subscribe(types => this.typesProjets = types);
  }

  /**
   * Crée le formulaire d'un projet
   */
  public formProjet(): void {
    this.formBody = this.fb.group({
      intitule: [this.data.update ? this.data.projet.intitule : ''],
      description: [this.data.update ? this.data.projet.description : ''],
      type: [this.data.update ? this.data.projet.type : ''],
      photos: [this.data.update ? this.data.projet.photos : this.photoFormArray],
    });
  }

  /**
   * Affiche le mat-select type
   */
  public compareFunction(type1: any, type2: any) {
    return type1.id === type2.id;
  }

  /**
   * Pré remplit le formaulaire avec les photos existantes
   */
  public initPhotos() {
    if (this.data && this.data.update) {
      this.data.projet.photos.forEach(photo => {
        const form = this.createPhotoForm(photo);
        this.photoFormArray.push(form);
      })
    }
  }

  /**
   * Crée un formulaire photos
   */
  public createPhotoForm(photo?: Photo) {
    return this.fb.group({
      nom: [photo ? photo.nom : ''],
      categorie: [photo ? photo.categorie : ''],
      lien: [photo ? photo.lien : ''],
      id: [photo ? photo.id : ''],
      projet: [photo ? {id: this.data.projet.id} : '']
    });
  }

  /**
   * Ajoute un formulaire photo
   */
  addPhotoForm() {
    this.photoFormArray.push(this.createPhotoForm());
  }

  /**
   * Supprime le champ du formulaire qui contient le formulaire
   * @param index
   */
  removePhotos(index: number) {
    this.photoFormArray.removeAt(index);
    this.formBody.controls.photos.setValue(this.photoFormArray);
    console.log(index)
  }

  /**
   * Soumet le formulaire de création
   */
  public onSubmitCreate(): void {
    const projet = {
      admin: {login: this.jwtService.getAdmin().login, role: "ADMIN"}, ...this.formBody.value,
      photos: this.formBody.controls.photos.value.value,
      type: this.formBody.controls.type.value
    };
    this.projetService.saveProjetInfos(projet)
      .subscribe(projet => {
        this.es.handleSuccess("Projet créé");
        this.dialogRef.close(projet);},
        _=>this.es.handleError("Une erreur s'est produite lors de l'enregistrement de votre projet")
      );
  }

  /**
   * Réactive le champ du formulaire
   */
  public enable(champ: string) {
    if (this.data.update) {
      this.formBody.get(champ).enable();
      this.formBody.get(champ).setValue("");
    }
  }

  /**
   * Modifie un projet via le formulaire
   */
  public onSubmitUpdate() {
    const projet = {
      id: this.data.projet.id,
      admin: {login: this.jwtService.getAdmin().login, role: "ADMIN"}, ...this.formBody.value,
      photos: this.photoFormArray.value,
      type: this.formBody.controls.type.value
    };
    projet.photos.forEach(p => p.projet = {id: this.data.projet.id});
    this.projetService.updateProjet(projet)
      .subscribe(projet => {
        this.es.handleSuccess("Projet modifié");
        this.dialogRef.close(projet);},
        _=>this.es.handleError("Une erreur s'est produite lors de la modification de votre projet")
      );
  }

  /**
   * Ferme la popup
   */
  public closePopUp() {
    this.dialogRef.close();
  }
}


