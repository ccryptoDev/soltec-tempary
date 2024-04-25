import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthValidation} from '../../../utils/auth-validation';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  password: string = '';

  passwordRequired: boolean = true;
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

  constructor(private route: ActivatedRoute, private router: Router) {

  }

  resetPass() {
    const token = this.route.snapshot.params['token'];
    if (!this.passwordRequired && !this.passwordFormatError) {

    }
  }

  updatePasswordValidation() {
    this.passwordRequired = this.password.trim() === '';
    this.passwordValidation.upperAndlowcase = AuthValidation.validatePassword(this.password, 1);
    this.passwordValidation.numberOrSymbol = AuthValidation.validatePassword(this.password, 2);
    this.passwordValidation.minLength = AuthValidation.validatePassword(this.password, 3);
    this.passwordFormatError = !Object.values(this.passwordValidation).every(value => value);
  }
}
