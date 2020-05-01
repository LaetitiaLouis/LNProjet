import {Component, Input, OnInit} from '@angular/core';
import {Admin} from "../../../model/admin";
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {JwtService} from "../../../jwt/jwt.service";
import {AdminService} from "../../../service/admin.service";
import {Router} from "@angular/router";
import {FormValidatorService} from "../../../service/form-validator.service";

@Component({
  selector: 'app-creation-admin',
  templateUrl: './creation-admin.component.html',
  styleUrls: ['./creation-admin.component.css']
})
export class CreationAdminComponent implements OnInit {
  public admin: Admin;
  public formBody: FormGroup;


  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private validator: FormValidatorService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.formBody = this.fb.group({
      prenom: ["",[Validators.required]],
      login: ["",[Validators.required]],
      password: ["",[Validators.required]],
        // Validators.minLength(6)],
      confirmPassword:["",[Validators.required]],
      presentation: ["",[Validators.required]],
      photo: ["",[Validators.required]],
      role: [{value:"ADMIN", disabled:false}]
    },
      {
        validators: this.validator.passwordMatch
      });
  }


  onSubmit() {
    this.adminService.registerAdmin(this.formBody.value).subscribe(admin => admin && this.router.navigate(['/profil']));
  }
}
