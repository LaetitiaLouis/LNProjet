import {Component, Input, OnInit} from '@angular/core';
import {Admin} from "../model/admin";
import {JwtService} from "../jwt/jwt.service";
import {AdminService} from "../service/admin.service";
import {FormBuilder, Validators} from "@angular/forms";
import {FormValidatorService} from "../service/form-validator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public admin: Admin;
  @Input() update = false;
  public registerForm;

  constructor(private jwtService: JwtService,
              private adminService: AdminService,
              private fb: FormBuilder,
              private validator: FormValidatorService,
              private router: Router) {
  }

  ngOnInit(): void {
    //récupération de l'admin connecté
    this.admin = this.jwtService.getAdmin();

    //création des champs du formulaire et association des validateurs
    this.registerForm = this.fb.group({
        login: [{value: '', disabled: this.update}, [Validators.required], [this.validator.loginExits()]],
        password: [{value: '', disabled: this.update}, [Validators.required, Validators.minLength(6)]],
        confirmPassword: [{value: '', disabled: this.update}, [Validators.required]],
        prenom: [{value: '', disabled: this.update}, [Validators.required]],
        role: [{value: '', disabled: this.update}, [Validators.required]],
        photo: [{value: '', disabled: this.update}, [Validators.required]],
        presentation: [{value: '', disabled: this.update}, [Validators.required]]
      }
      // ,
      //   {
      //     validators: this.validator.passwordMatch
      //   }
    );
  }

  /**
   * getter pour obtenir les controls du formulaire
   */
  get f() {
    return this.registerForm.controls;
  }

  /**
   * Vérification que le profil est complet avant de l'envoyer
   */
  updateAdminObject() {
    Object.entries(this.registerForm.value).forEach(([key, value]) => {
      if (value) {
        this.admin[key] = value;
      }
    });
  }

  /**
   * soumission du formulaire
   * definir si new ou update
   * faire la requête correspondante
   */
  onSubmitForm() {
    if (this.registerForm.invalid) {
      return;
    }
    if (this.update) {
      this.updateAdminObject();
      this.adminService.updatedAdmin(this.admin).subscribe(
        admin => console.log(admin)
      );
    } else {
      this.adminService.registerAdmin(this.registerForm.value).subscribe(
        admin => admin && this.router.navigate(['/admins'])
      );
    }
  }

}
