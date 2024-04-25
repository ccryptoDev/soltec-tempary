import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import {AuthValidation} from '../../../utils/auth-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerSuccess: boolean = false;

  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  firstnameRequired: boolean = true;
  lastnameRequired: boolean = true;
  emailRequired: boolean = true;
  passwordRequired: boolean = true;

  emailFormatError: boolean = true;
  passwordFormatError: boolean = true;

  passwordValidation: {
    upperAndlowcase: boolean,
    numberOrSymbol: boolean,
    minLength: boolean
  } = {
    upperAndlowcase: false,
    numberOrSymbol: false,
    minLength: false
  };

  errorType: string | null = null;
  errorMsg: { [key: string]: { title: string; desc: string } } = {
    'serverErr': {
      'title': 'Error de servidor.',
      'desc': 'Problema al conectar al servidor. Intenta más tarde.'
    },
    'existedUser': {
      'title': 'El usuario ya existe.',
      'desc': 'El correo que estás utilizando ya está registrado como un usuario.'
    }
  };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.firstnameRequired && !this.lastnameRequired && !this.emailFormatError && !this.passwordFormatError) {
      const user = {
        'firstName': this.firstName,
        'lastName': this.lastName,
        'email': this.email,
        'password': this.password
      }
      this.authService.register(user).subscribe(
        (response) => {
          const res = response.body;
        },
        (error) => {
          // handle the errors by response.status
        }
      );
      this.errorType = 'existedUser';
    }
  }

  updateFirstnameValidation() {
    this.firstnameRequired = this.firstName.trim() === '';
  }

  updateLastnameValidation() {
    this.lastnameRequired = this.lastName.trim() === '';
  }

  updateEmailValidation() {
    this.emailRequired = this.email.trim() === '';
    this.emailFormatError = AuthValidation.validateEmail(this.email) === false;
  }

  updatePasswordValidation() {
    this.passwordRequired = this.password.trim() === '';
    this.passwordValidation.upperAndlowcase = AuthValidation.validatePassword(this.password, 1);
    this.passwordValidation.numberOrSymbol = AuthValidation.validatePassword(this.password, 2);
    this.passwordValidation.minLength = AuthValidation.validatePassword(this.password, 3);
    this.passwordFormatError = !Object.values(this.passwordValidation).every(value => value);
  }



  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
