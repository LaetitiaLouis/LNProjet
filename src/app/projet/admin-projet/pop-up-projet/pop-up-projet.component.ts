import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ProjetService} from "../../../service/projet.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ErrorService} from "../../../service/error.service";
import {JwtService} from "../../../jwt/jwt.service";
import {consoleTestResultHandler} from "tslint/lib/test";
import {TypeService} from "../../../service/type.service";
import {Type} from "../../../model/type";
import {map, tap} from "rxjs/operators";
import {Photo} from "../../../model/photo";

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

  ngOnInit(): void {
    this.getTypesProjets();
    this.formProjet();
    this.initPhotos();
  }

  getTypesProjets() {
    this.typeService.getAllTypes().subscribe(types => this.typesProjets = types);
  }

  formProjet(): void {
    this.formBody = this.fb.group({
      intitule: [this.data.update ? this.data.projet.intitule : ''],
      description: [this.data.update ? this.data.projet.description : ''],
      type: [this.data.update ? this.data.projet.type : ''],
      photos: [this.data.update ? this.data.projet.photos : this.photoFormArray],
      // admin: [{value: this.jwtService.getAdmin(), disabled: !this.data.update}]
    });
  }

  //affiche le mat-select type
  compareFunction(type1: any, type2: any) {
    return type1.id === type2.id;
  }

  initPhotos() {
    console.log('initPhotos')
    if(this.data && this.data.update){
      this.data.projet.photos.forEach(photo=> {
        const form = this.createPhotoForm(photo);
      this.photoFormArray.push(form);
      })

    }
  }

  createPhotoForm(photo?: Photo) {
    return this.fb.group({
      nom: [photo ? photo.nom : ''],
      categorie: [photo ? photo.categorie : ''],
      lien: [photo ? photo.lien : ''],
      id: [photo? photo.id: ''],
      projet:[photo? {id: this.data.projet.id} :'']
    });
  }

  addPhotoForm() {
    this.photoFormArray.push(this.createPhotoForm());
  }

  removePhotos(index: number) {
    this.photoFormArray.removeAt(index);
    this.formBody.controls.photos.setValue(this.photoFormArray);
    console.log(index)
  }

  onSubmitCreate(): void {
    const projet = {
      admin: {login: this.jwtService.getAdmin().login, role: "ADMIN"}, ...this.formBody.value,
      photos: this.formBody.controls.photos.value.value,
      type: this.formBody.controls.type.value
    };
    console.log(projet);
    this.projetService.saveProjetInfos(projet)
      .pipe(tap(this.es.handleSuccess("Projet créé")))
      .subscribe(projet =>
          this.dialogRef.close(projet),
        this.es.handleError("Erreur")
      );
  }

  enable(champ: string) {
    if (this.data.update) {
      this.formBody.get(champ).enable();
      this.formBody.get(champ).setValue("");
    }
  }

  onSubmitUpdate() {
    const projet = {
      id: this.data.projet.id,
      admin: {login: this.jwtService.getAdmin().login, role: "ADMIN"}, ...this.formBody.value,
      photos: this.photoFormArray.value,
      type: this.formBody.controls.type.value
    };
    projet.photos.forEach(p=>p.projet ={id: this.data.projet.id});
    this.projetService.updateProjet(projet)
      .pipe(tap(this.es.handleSuccess("Projet modifié")))
      .subscribe(projet =>
          this.dialogRef.close(projet),
        this.es.handleError("Erreur")
      );
  }

  closePopUp() {
    this.dialogRef.close();
  }
}


