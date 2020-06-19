import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../../../service/message.service";
import {ClientService} from "../../../service/client.service";
import {FormValidatorService} from "../../../service/form-validator.service";
import {map, mergeMap} from "rxjs/operators";
import {ErrorService} from "../../../service/error.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public formBody: FormGroup;
  submitted = true;

  constructor(private messageService: MessageService,
              private clientService: ClientService,
              private validator: FormValidatorService,
              private es: ErrorService,
              private router: Router,
              private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.formBody = this.fb.group({
        objet: ["", [Validators.required]],
        contenu: ["", [Validators.required]],
        nom: ["", [Validators.required]],
        prenom: ["", [Validators.required]],
        adresse: ["", [Validators.required]],
        codePostal: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
        ville: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        confirmEmail: ["", [Validators.required, Validators.email]],
        telephone: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]]
      },
      {
        validators: this.validator.emailMatch
      });
  }

  /**
   * Getter pour obtenir les control du formulaire
   */
  public get f() {
    return this.formBody.controls;
  }


  public onSubmitFormBody() {
    this.messageService.saveNewMessage({
      ...this.formBody.value,
      client: this.formBody.value
    }).subscribe(message => {
        this.es.handleSuccess("Message envoyé !");
        this.router.navigate(['/accueil']);
      },
      _ => this.es.handleError("Une erreur s'est produite, votre message n'a pas été envoyé"));
    this.formBody.reset();
  }

}


