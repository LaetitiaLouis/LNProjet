import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "../service/message.service";
import {ClientService} from "../service/client.service";
import {FormValidatorService} from "../service/form-validator.service";
import {map, mergeMap} from "rxjs/operators";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  public formBody: FormGroup;


  constructor(private messageService: MessageService,
              private clientService: ClientService,
              private validator: FormValidatorService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
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
        telephone: ["", [Validators.required, Validators.minLength(15), Validators.maxLength(15)]]
      },
      {
        validators: this.validator.emailMatch
      });
  }

  /**
   * Getter pour obtenir les control du formulaire
   */
  get f() {
    return this.formBody.controls;
  }

  onSubmitFormBody() {
    // this.clientService.saveNewClient(this.formBody.value).pipe(
    //     //   mergeMap(client => this.messageService.saveNewMessage(({client: {id: client.id}, ...this.formBody.value})))).subscribe
    //     // (message => console.log(message)
    //     // );
    this.messageService.saveNewMessage({
      ...this.formBody.value,
      client: this.formBody.value
    }).subscribe(message => console.log(message));
  }
}

