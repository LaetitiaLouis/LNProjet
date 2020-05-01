import {Component, Input, OnInit} from '@angular/core';
import {MessageService} from "../service/message.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Message} from "@angular/compiler/src/i18n/i18n_ast";
import {Client} from "../model/client";
import {ClientService} from "../service/client.service";
import {FormValidatorService} from "../service/form-validator.service";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
public formBody: FormGroup;


  constructor(private messageService: MessageService,
              private clientService: ClientService,
              private validator: FormValidatorService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formBody = this.fb.group({
      objet: ["",[Validators.required]],
      contenu: ["",[Validators.required]],
      nom: ["",[Validators.required]],
      prenom: ["",[Validators.required]],
      adresse: ["",[Validators.required]],
      codePostal: ["",[Validators.required, Validators.minLength(5),Validators.maxLength(5)]],
      ville: ["",[Validators.required]],
      email: ["",[Validators.required, Validators.email]],
      confirmEmail: ["",[Validators.required, Validators.email]],
      telephone: ["",[Validators.required, Validators.minLength(15), Validators.maxLength(15)]]
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
    this.clientService.saveNewClient(this.formBody.value).pipe(
      map(client => this.messageService.saveNewMessage(({client: {id: client.id}, ...this.formBody.value})))).subscribe
        (message => console.log(message)
    );
  }
}
