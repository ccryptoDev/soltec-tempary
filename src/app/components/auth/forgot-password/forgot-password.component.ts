import { Component } from '@angular/core';
import { AuthValidation } from '../../../utils/auth-validation';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email: string = '';

  emailRequired: boolean = true;
  emailFormatError: boolean = true;

  constructor() {}

  sendingEmail() {
    if (!this.emailRequired && !this.emailFormatError) {
      // send a email
    }
  }

  updateEmailValidation() {
    this.emailRequired = this.email.trim() === '';
    this.emailFormatError = AuthValidation.validateEmail(this.email) === false;
  }
}
