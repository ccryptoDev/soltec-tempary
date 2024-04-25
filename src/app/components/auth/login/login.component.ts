import { Component, AfterViewInit, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { AuthValidation } from '../../../utils/auth-validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';

  // validation
  emailRequired: boolean = true;
  passwordRequired: boolean = true;
  emailFormatError: boolean = true;

  // error codes
  serverError: boolean = false;
  credentialError: boolean = false;

  // error type and messages
  errorType: string | null = null;
  errorMsg: { [key: string]: { title: string; desc: string } } = {
    'serverErr': {
      'title': 'Error de servidor.',
      'desc': 'Problema al conectar al servidor. Intenta más tarde.'
    },
    'credentialErr': {
      'title': 'Las credenciales son incorrectas.',
      'desc': 'Por favor, revisa las credenciales ingresadas.'
    }
  };

  constructor(private authService: AuthService, private router: Router, private el: ElementRef) {}

  ngAfterViewInit() {

  }

  login() {
    if (!this.emailRequired && !this.emailFormatError && !this.passwordRequired) {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          const userData = response.body;
          // store a token
          this.authService.setAuthToken(userData.token);
          // store the user profile inform
          delete userData.token;
          this.authService.setUserProfile(userData);
        },
        (error) => {
          // handle the errors by response.status
        }
      );
      this.router.navigate(['/projects']);
    }
  }

  updateEmailValidation() {
    this.emailRequired = this.email.trim() === '';
    this.emailFormatError = AuthValidation.validateEmail(this.email) === false;
  }

  updatePasswordValidation() {
    this.passwordRequired = this.password.trim() === '';
  }

  redirectToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  redirectToSignup() {
    this.router.navigate(['/register']);
  }

  social_login() {
    alert('social login');
  }
}
